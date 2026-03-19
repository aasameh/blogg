const Pagination = ({ meta, onPageChange }) => {
    const { page, totalPages } = meta;

    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    return (
        <nav className="w-full flex items-center justify-between mt-8 font-mono border-y border-black py-2">
            <button
                onClick={() => onPageChange(page - 1)}
                disabled={page <= 1}
                className="text-[10px] uppercase tracking-[0.3em] font-bold text-black hover:text-[var(--color-accent)] disabled:opacity-20 transition-colors"
                title="PREV[PG]"
            >
                [ {"<"} ]
            </button>
            <div className="flex gap-4">
                {pages.map((p) => (
                    <button
                        key={p}
                        onClick={() => onPageChange(p)}
                        className={`text-[10px] tracking-[0.2em] font-bold px-2 py-1 ${p === page
                                ? 'bg-black text-white'
                                : 'text-black hover:bg-gray-200'
                            }`}
                    >
                        {p < 10 ? `0${p}` : p}
                    </button>
                ))}
            </div>
            <button
                onClick={() => onPageChange(page + 1)}
                disabled={page >= totalPages}
                className="text-[10px] uppercase tracking-[0.3em] font-bold text-black hover:text-[var(--color-accent)] disabled:opacity-20 transition-colors"
                title="NEXT[PG]"
            >
                [ {">"} ]
            </button>
        </nav>
    );
};

export default Pagination;
