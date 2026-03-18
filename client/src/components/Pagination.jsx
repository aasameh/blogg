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
        <nav className="flex items-center justify-center gap-2 mt-8 font-mono">
            <button
                onClick={() => onPageChange(page - 1)}
                disabled={page <= 1}
                className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary-900 bg-white border-2 border-primary-900 
          hover:bg-primary-900 hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-primary-900 disabled:cursor-not-allowed transition-colors"
            >
                Prev
            </button>

            {start > 1 && (
                <>
                    <button
                        onClick={() => onPageChange(1)}
                        className="px-4 py-2 text-xs font-bold text-primary-900 bg-white border-2 border-primary-900 hover:bg-primary-900 hover:text-white transition-colors"
                    >
                        1
                    </button>
                    {start > 2 && <span className="px-2 text-primary-400 font-bold">...</span>}
                </>
            )}

            {pages.map((p) => (
                <button
                    key={p}
                    onClick={() => onPageChange(p)}
                    className={`px-4 py-2 text-xs font-bold border-2 transition-colors ${p === page
                            ? 'bg-primary-900 text-white border-primary-900'
                            : 'text-primary-900 bg-white border-primary-900 hover:bg-primary-100'
                        }`}
                >
                    {p}
                </button>
            ))}

            {end < totalPages && (
                <>
                    {end < totalPages - 1 && <span className="px-2 text-primary-400 font-bold">...</span>}
                    <button
                        onClick={() => onPageChange(totalPages)}
                        className="px-4 py-2 text-xs font-bold text-primary-900 bg-white border-2 border-primary-900 hover:bg-primary-900 hover:text-white transition-colors"
                    >
                        {totalPages}
                    </button>
                </>
            )}

            <button
                onClick={() => onPageChange(page + 1)}
                disabled={page >= totalPages}
                className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary-900 bg-white border-2 border-primary-900 
          hover:bg-primary-900 hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-primary-900 disabled:cursor-not-allowed transition-colors"
            >
                Next
            </button>
        </nav>
    );
};

export default Pagination;
