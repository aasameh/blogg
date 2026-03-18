const TagBadge = ({ tag }) => (
    <span className="inline-flex items-center px-3 py-1 border-2 border-primary-900 bg-white font-mono text-[10px] font-bold uppercase tracking-widest text-primary-900 hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] hover:text-white transition-colors cursor-default shadow-[2px_2px_0_0_var(--color-primary-900)]">
        #{tag.name}
    </span>
);

export default TagBadge;
