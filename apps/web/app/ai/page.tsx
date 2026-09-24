'use client';

import { useState, useRef, useEffect, ChangeEvent, DragEvent } from 'react';
import { Bot, Send, AlertTriangle, User, RefreshCw, BookOpen, CheckCircle, FileText, HelpCircle, Trash2, ImageIcon, Paperclip, Pin, PinOff, X, UploadCloud } from 'lucide-react';
import { AppShell } from '../../components/layout/app-shell';
import { useToast } from '../../components/ui/toast-context';

interface ChatAttachment {
  id: string;
  name: string;
  mimeType: string;
  size: number;
  kind: 'image' | 'file';
  dataUrl?: string;
  pinned: boolean;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  attachments?: ChatAttachment[];
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'm0',
    sender: 'ai',
    text: 'Здравствуйте! Я учебный ассистент **QALQAN AI**.\n\nПомогу разобраться в сложной теме по математике, IT, информационной безопасности или истории Казахстана, подготовлю конспект или тест для самопроверки.\n\n*Что хотите изучить сегодня?*',
    timestamp: '10:00'
  }
];

const ATTACHMENT_STORAGE_KEY = 'qalqan-ai-session-attachments';
const MAX_ATTACHMENTS = 4;
const MAX_ATTACHMENT_SIZE = 10 * 1024 * 1024;
const CHAT_API_URL = process.env.NEXT_PUBLIC_CHAT_API_URL || (typeof window !== 'undefined' && window.location.hostname.includes('localhost') ? 'http://localhost:3001/api/chat' : 'http://localhost:3001/api/chat');

const formatBytes = (size: number) => {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

const readFileAsDataUrl = (file: File) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(String(reader.result ?? ''));
  reader.onerror = () => reject(new Error('Не удалось прочитать файл'));
  reader.readAsDataURL(file);
});

const validateAttachment = (file: File): string | null => {
  if (file.size > MAX_ATTACHMENT_SIZE) {
    return 'Размер файла не должен превышать 10 МБ.';
  }

  const allowedTypes = [
    'image/',
    'application/pdf',
    'text/plain',
    'text/csv',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ];

  if (!allowedTypes.some((type) => file.type.startsWith(type) || type === file.type)) {
    return 'Поддерживаются изображения, PDF, DOCX, TXT и CSV.';
  }

  return null;
};

const createAttachment = async (file: File, pinned = false): Promise<ChatAttachment> => {
  const dataUrl = await readFileAsDataUrl(file);
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    name: file.name,
    mimeType: file.type || 'application/octet-stream',
    size: file.size,
    kind: file.type.startsWith('image/') ? 'image' : 'file',
    dataUrl,
    pinned
  };
};

const createMessage = (text: string, sender: 'user' | 'ai', attachments: ChatAttachment[] = []): Message => ({
  id: Math.random().toString(36).slice(2, 10),
  sender,
  text,
  attachments: attachments.length ? attachments : undefined,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
});

function MarkdownView({ content }: { content: string }) {
  const lines = content.split('\n');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', lineHeight: 1.6 }}>
      {lines.map((line, idx) => {
        if (line.startsWith('### ')) {
          return <h4 key={idx} style={{ fontSize: '15px', fontWeight: 700, color: 'var(--gold)', margin: '6px 0 2px' }}>{line.replace('### ', '')}</h4>;
        }
        if (line.startsWith('- ') || line.startsWith('* ')) {
          return (
            <div key={idx} style={{ paddingLeft: '14px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--gold)' }}>•</span>
              <span>{line.replace(/^[-*]\s+/, '')}</span>
            </div>
          );
        }
        if (line.trim() === '') {
          return <div key={idx} style={{ height: '4px' }} />;
        }
        return <p key={idx} style={{ margin: 0 }}>{line}</p>;
      })}
    </div>
  );
}

export default function AiPage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [attachments, setAttachments] = useState<ChatAttachment[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUserPrompt, setLastUserPrompt] = useState<string | null>(null);
  const [lastError, setLastError] = useState<string | null>(null);
  const pinnedAttachments = attachments.filter((attachment) => attachment.pinned);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(ATTACHMENT_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as ChatAttachment[];
      if (Array.isArray(parsed)) {
        setAttachments(parsed.slice(0, MAX_ATTACHMENTS));
      }
    } catch {
      // ignore invalid session state
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(ATTACHMENT_STORAGE_KEY, JSON.stringify(attachments));
    } catch {
      // ignore storage limits
    }
  }, [attachments]);

  const handleFiles = async (incoming: FileList | File[]) => {
    const files = Array.from(incoming);
    if (!files.length) return;

    const availableSlots = MAX_ATTACHMENTS - attachments.length;
    if (availableSlots <= 0) {
      showToast('Максимум 4 вложения в одном сообщении.', 'error');
      return;
    }

    const allowedFiles = files.slice(0, availableSlots);
    const resolved: ChatAttachment[] = [];

    for (const file of allowedFiles) {
      const validationMessage = validateAttachment(file);
      if (validationMessage) {
        showToast(`${file.name}: ${validationMessage}`, 'error');
        continue;
      }

      resolved.push(await createAttachment(file));
    }

    if (!resolved.length) return;
    setAttachments((prev) => [...prev, ...resolved].slice(0, MAX_ATTACHMENTS));
  };

  const togglePin = (id: string) => {
    setAttachments((prev) => prev.map((item) => item.id === id ? { ...item, pinned: !item.pinned } : item));
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    const payloadAttachments = attachments.slice();
    if ((!query && !payloadAttachments.length) || isLoading) return;

    setMessages((prev) => [...prev, createMessage(query || 'Прикрепленные материалы', 'user', payloadAttachments)]);
    setInput('');
    setAttachments([]);
    setIsLoading(true);
    setLastUserPrompt(query || 'Прикрепленные материалы');
    setLastError(null);

    try {
      const res = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query || 'Проанализируй прикрепленные материалы и помоги мне с ними.',
          attachments: payloadAttachments.map(({ id, name, mimeType, size, kind, dataUrl, pinned }) => ({ id, name, mimeType, size, kind, dataUrl, pinned }))
        })
      });

      const data = await res.json();
      const fallbackReply = data?.configured === false
        ? 'QALQAN AI пока не настроен.\n\nДобавьте GEMINI_API_KEY в `.env.local` и перезапустите сервер.'
        : data?.reply || 'Не удалось получить ответ. Попробуйте ещё раз.';

      const reply = data?.configured === false || data?.reply || data?.error ? fallbackReply : 'Не удалось получить ответ. Попробуйте ещё раз.';

      if (!res.ok || data?.error || (!data?.reply && data?.configured !== false)) {
        setLastError('Не удалось получить ответ. Попробуйте ещё раз.');
      }

      setMessages((prev) => [...prev, createMessage(reply, 'ai')]);

      if (!res.ok || data?.error || (!data?.reply && data?.configured !== false)) {
        showToast('Не удалось получить ответ. Попробуйте ещё раз.', 'error');
      }
    } catch {
      const fallbackText = 'Не удалось получить ответ. Попробуйте ещё раз.';
      setMessages((prev) => [...prev, createMessage(fallbackText, 'ai')]);
      setLastError(fallbackText);
      showToast(fallbackText, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (lastUserPrompt) {
      void handleSend(lastUserPrompt);
    }
  };

  const handleClearChat = () => {
    setMessages(INITIAL_MESSAGES);
    setInput('');
    setAttachments([]);
    setLastUserPrompt(null);
    setLastError(null);
  };

  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files?.length) {
      await handleFiles(files);
      event.target.value = '';
    }
  };

  const handleDrop = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer.files.length) {
      await handleFiles(event.dataTransfer.files);
    }
  };

  const quickPrompts = [
    { label: 'Объяснить тему', icon: HelpCircle, prompt: 'Объясни простыми словами разницу между симметричным и асимметричным шифрованием' },
    { label: 'Сделать тест', icon: CheckCircle, prompt: 'Сделай проверочный экспресс-тест из 3 вопросов по информационной безопасности' },
    { label: 'Сделать конспект', icon: FileText, prompt: 'Составь краткий опорный конспект по теме: Дифференциальные уравнения' },
    { label: 'Подготовить вопросы', icon: BookOpen, prompt: 'Подготовь 5 контрольных вопросов к семинару по истории Казахстана' }
  ];

  return (
    <AppShell
      eyebrow="Образовательный интеллект"
      heading="QALQAN AI"
      subheading="Учебный AI-помощник"
    >
      {pinnedAttachments.length > 0 && (
        <div
          className="card"
          style={{
            border: '1px solid var(--border-gold)',
            background: 'rgba(197, 160, 89, 0.06)',
            marginBottom: '16px',
            padding: '14px 16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', color: 'var(--gold)', fontWeight: 700 }}>
            <Pin size={15} />
            <span>Закрепленные файлы</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {pinnedAttachments.map((attachment) => (
              <div key={attachment.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid var(--line)', borderRadius: '10px', padding: '8px 10px', background: 'var(--surface-hover)' }}>
                {attachment.kind === 'image' && attachment.dataUrl ? <img src={attachment.dataUrl} alt={attachment.name} style={{ width: '24px', height: '24px', objectFit: 'cover', borderRadius: '6px' }} /> : <FileText size={14} />}
                <span style={{ fontSize: '12px', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{attachment.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div
        className="card"
        style={{
          border: '1px solid var(--border-gold)',
          background: 'rgba(197, 160, 89, 0.08)',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}
        id="ai-privacy-disclaimer"
      >
        <AlertTriangle size={20} style={{ color: 'var(--gold)', flexShrink: 0 }} />
        <div style={{ fontSize: '13px', color: 'var(--text-platinum)' }}>
          <strong>Важное предупреждение:</strong> Не вводите сюда служебную, конфиденциальную или персональную информацию.
          Сервис предназначен исключительно для академических и учебных целей.
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '16px', alignItems: 'center' }}>
        {quickPrompts.map((btn) => {
          const Icon = btn.icon;
          return (
            <button
              key={btn.label}
              onClick={() => handleSend(btn.prompt)}
              className="button button-secondary button-sm"
              style={{ fontSize: '13px', gap: '6px' }}
              disabled={isLoading}
            >
              <Icon size={14} style={{ color: 'var(--gold)' }} />
              <span>{btn.label}</span>
            </button>
          );
        })}

        <button
          onClick={handleClearChat}
          className="button button-ghost button-sm"
          style={{ marginLeft: 'auto', gap: '6px' }}
          disabled={isLoading}
        >
          <Trash2 size={14} />
          <span>Очистить чат</span>
        </button>
      </div>

      <div
        className="card"
        style={{
          minHeight: '480px',
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
          overflow: 'hidden'
        }}
        id="ai-chat-card"
      >
        <div
          style={{
            flex: 1,
            padding: '20px',
            overflowY: 'auto',
            maxHeight: '550px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          {messages.map((m) => {
            const isAi = m.sender === 'ai';
            return (
              <div
                key={m.id}
                className="ai-message-row"
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignSelf: isAi ? 'flex-start' : 'flex-end'
                }}
              >
                {isAi && (
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '8px',
                      background: 'var(--gold-muted)',
                      color: 'var(--gold)',
                      display: 'grid',
                      placeItems: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Bot size={18} />
                  </div>
                )}

                <div
                  style={{
                    background: isAi ? 'var(--surface-hover)' : 'var(--gold-muted)',
                    border: isAi ? '1px solid var(--line)' : '1px solid var(--border-gold)',
                    borderRadius: 'var(--radius)',
                    padding: '14px 16px',
                    color: 'var(--text)',
                    fontSize: '14px',
                    maxWidth: '80%'
                  }}
                >
                  {m.attachments?.length ? (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                      {m.attachments.map((attachment) => (
                        <div
                          key={attachment.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '6px 8px',
                            borderRadius: '10px',
                            background: 'rgba(197, 160, 89, 0.09)',
                            border: '1px solid var(--line)',
                            color: 'var(--text)',
                            maxWidth: '220px'
                          }}
                        >
                          {attachment.kind === 'image' && attachment.dataUrl ? (
                            <img src={attachment.dataUrl} alt={attachment.name} style={{ width: '28px', height: '28px', objectFit: 'cover', borderRadius: '6px' }} />
                          ) : (
                            <div style={{ width: '28px', height: '28px', borderRadius: '6px', display: 'grid', placeItems: 'center', background: 'var(--gold-muted)', color: 'var(--gold)' }}>
                              {attachment.kind === 'image' ? <ImageIcon size={14} /> : <FileText size={14} />}
                            </div>
                          )}
                          <div style={{ minWidth: 0, flex: 1 }}>
                            <div style={{ fontSize: '11px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{attachment.name}</div>
                            <div style={{ fontSize: '10px', color: 'var(--muted)' }}>{formatBytes(attachment.size)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                  <MarkdownView content={m.text} />
                  <div style={{ fontSize: '11px', color: 'var(--muted)', textAlign: 'right', marginTop: '6px' }}>{m.timestamp}</div>
                </div>

                {!isAi && (
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '8px',
                      background: 'var(--surface-hover)',
                      display: 'grid',
                      placeItems: 'center',
                      flexShrink: 0
                    }}
                  >
                    <User size={18} />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', color: 'var(--gold)', fontSize: '13px' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  background: 'var(--gold-muted)',
                  display: 'grid',
                  placeItems: 'center'
                }}
              >
                <RefreshCw size={16} className="spin-animation" />
              </div>
              <span>QALQAN AI печатает...</span>
            </div>
          )}

          {lastError && !isLoading && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: 'var(--radius)',
                border: '1px solid rgba(239, 68, 68, 0.35)',
                background: 'rgba(239, 68, 68, 0.08)',
                color: 'var(--text)'
              }}
            >
              <span>{lastError}</span>
              <button onClick={handleRetry} className="button button-secondary button-sm">Повторить</button>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        <div style={{ padding: '16px 20px', borderTop: '1px solid var(--line)', background: 'var(--surface)' }}>
          <div
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            style={{
              border: `1px dashed ${isDragging ? 'var(--gold)' : 'var(--line)'}`,
              borderRadius: 'var(--radius-sm)',
              background: isDragging ? 'rgba(197, 160, 89, 0.08)' : 'transparent',
              padding: '10px',
              marginBottom: '10px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--muted)', fontSize: '12px' }}>
                <UploadCloud size={15} style={{ color: 'var(--gold)' }} />
                <span>Перетащите фото или файл сюда</span>
              </div>
              <button
                type="button"
                className="button button-secondary button-sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <Paperclip size={14} />
                <span>Прикрепить</span>
              </button>
            </div>

            <input ref={fileInputRef} type="file" multiple accept="image/*,.pdf,.txt,.csv,.doc,.docx,.xls,.xlsx" hidden onChange={handleInputChange} />

            {attachments.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                {attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      border: '1px solid var(--line)',
                      borderRadius: '10px',
                      padding: '6px 8px',
                      background: 'var(--surface-hover)',
                      maxWidth: '220px'
                    }}
                  >
                    {attachment.kind === 'image' && attachment.dataUrl ? (
                      <img src={attachment.dataUrl} alt={attachment.name} style={{ width: '26px', height: '26px', objectFit: 'cover', borderRadius: '6px' }} />
                    ) : (
                      <div style={{ width: '26px', height: '26px', borderRadius: '6px', display: 'grid', placeItems: 'center', background: 'var(--gold-muted)', color: 'var(--gold)' }}>
                        <FileText size={14} />
                      </div>
                    )}
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontSize: '11px', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{attachment.name}</div>
                      <div style={{ fontSize: '10px', color: 'var(--muted)' }}>{formatBytes(attachment.size)}</div>
                    </div>
                    <button type="button" className="button button-ghost" style={{ padding: '4px', minWidth: 0 }} onClick={() => togglePin(attachment.id)} title={attachment.pinned ? 'Открепить' : 'Закрепить'}>
                      {attachment.pinned ? <PinOff size={14} /> : <Pin size={14} />}
                    </button>
                    <button type="button" className="button button-ghost" style={{ padding: '4px', minWidth: 0, color: 'var(--danger)' }} onClick={() => removeAttachment(attachment.id)} title="Удалить">
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <textarea
              rows={1}
              className="input"
              placeholder="Что хотите изучить?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  void handleSend();
                }
              }}
              disabled={isLoading}
              id="ai-prompt-input"
              style={{ resize: 'vertical', minHeight: '48px', maxHeight: '140px' }}
            />
            <button
              onClick={() => void handleSend()}
              disabled={isLoading || (!input.trim() && attachments.length === 0)}
              className="button button-primary"
              id="ai-send-btn"
              style={{ minWidth: '48px', padding: '0 16px' }}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
