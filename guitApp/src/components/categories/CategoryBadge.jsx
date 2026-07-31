import { CategoryIcon } from './CategoryIcon'

export function CategoryBadge({ category, onClick }) {
  const content = (
    <>
      <span className="category-icon-circle" style={{ backgroundColor: category?.color ?? '#898781' }}>
        <CategoryIcon icon={category?.icon} />
      </span>
      <span className="category-name">{category?.name ?? 'Sin categoría'}</span>
    </>
  )

  if (onClick) {
    return (
      <button type="button" className="category-chip category-chip-button" onClick={onClick}>
        {content}
      </button>
    )
  }

  return <span className="category-chip">{content}</span>
}
