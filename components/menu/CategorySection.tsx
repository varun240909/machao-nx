import type { MenuCategory } from "@/data/menu"
import MenuCard from "./MenuCard"

interface CategorySectionProps {
  category: MenuCategory
}

export default function CategorySection({ category }: CategorySectionProps) {
  return (
    <section id={category.id} className="category-section">
      <div className={`category-header band-${category.accentColor}`}>
        <span className="category-header-emoji">{category.emoji}</span>
        <h2 className="category-header-title">{category.label}</h2>
        <span className="category-item-count">{category.items.length} items</span>
      </div>
      <div className="menu-grid section-padding">
        {category.items.map((item) => (
          <MenuCard
            key={item.id}
            item={item}
            categoryEmoji={category.emoji}
            accentColor={category.accentColor}
          />
        ))}
      </div>
    </section>
  )
}
