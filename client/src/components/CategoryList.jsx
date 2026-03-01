import { Link } from 'react-router-dom';
import useCategories from '../hooks/useCategories';

const CategoryList = () => {
    const { categories, loading, error } = useCategories();

    if (loading) {
        return (
            <div className="flex flex-wrap gap-2">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-8 w-20 bg-gray-200 rounded-full animate-pulse" />
                ))}
            </div>
        );
    }

    if (error || categories.length === 0) return null;

    return (
        <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
                <Link
                    key={cat.id}
                    to={`/category/${cat.slug}`}
                    className="px-4 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium
            text-gray-700 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200
            transition-colors"
                >
                    {cat.name}
                </Link>
            ))}
        </div>
    );
};

export default CategoryList;
