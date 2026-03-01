const TagBadge = ({ tag }) => (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 hover:bg-primary-50 hover:text-primary-600 transition-colors cursor-default">
        #{tag.name}
    </span>
);

export default TagBadge;
