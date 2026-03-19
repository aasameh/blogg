const TagBadge = ({ tag }) => (
    <span className="inline-flex items-center px-2 py-0 border border-black bg-white font-mono text-[10px] font-bold uppercase tracking-widest text-black hover:bg-black hover:text-white transition-colors cursor-default">
        [{tag.name}]
    </span>
);

export default TagBadge;
