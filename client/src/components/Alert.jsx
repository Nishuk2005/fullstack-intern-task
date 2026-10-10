const styles = {
  error: 'border-red-200 bg-red-50 text-red-800',
  info: 'border-brand-100 bg-brand-50 text-brand-700',
};

export default function Alert({ type = 'error', children }) {
  if (!children) return null;
  return (
    <div role={type === 'error' ? 'alert' : 'status'} className={`rounded-lg border px-4 py-3 text-sm ${styles[type]}`}>
      {children}
    </div>
  );
}
