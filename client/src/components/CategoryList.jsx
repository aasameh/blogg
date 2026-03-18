import { Link } from 'react-router-dom';
import useCategories from '../hooks/useCategories';

const CategoryList = () => {
    const { categories, loading, error } = useCategories();

    if (loading) {
        return (
            <div className="flex flex-col gap-3">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-10 w-full bg-primary-100 border-2 border-primary-900" />
                ))}
            </div>
        );
    }

    if (error || categories.length === 0) return null;

    return (
        <div className="flex flex-col gap-3">
            {categories.map((cat) => (
                <Link
                    key={cat.id}
                    to={`/category/${cat.slug}`}
                    className="group flex flex-col px-4 py-3 bg-[var(--color-beige-bg)] border-2 border-primary-900 
            text-[14px] font-bold font-mono uppercase tracking-widest text-primary-900 
            hover:bg-primary-900 hover:text-white transition-colors relative overflow-hidden"
                >
                    <span className="relative z-10 flex justify-between items-center w-full">
                        <span>{cat.name}</span>
                        <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </span>
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--color-accent)] z-20 group-hover:w-2 transition-all"></div>
                </Link>
            ))}
        </div>
    );
};

export default CategoryList;
