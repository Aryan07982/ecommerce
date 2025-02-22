export type SortOption = {
    label: string;
    value: string;
  };
  
  export const sortOptions: SortOption[] = [
    { label: "Featured", value: "featured" },
    { label: "Points: Low to High", value: "points-asc" },
    { label: "Points: High to Low", value: "points-desc" },
    { label: "Rating: High to Low", value: "rating-desc" },
    { label: "Most Popular", value: "popular" }
  ];
  
  export const sortRewards = (rewards: any[], sortBy: string) => {
    const sortedRewards = [...rewards]; // Create a copy to avoid mutating original array
    
    switch (sortBy) {
      case "points-asc":
        return sortedRewards.sort((a, b) => a.points - b.points);
      case "points-desc":
        return sortedRewards.sort((a, b) => b.points - a.points);
      case "rating-desc":
        return sortedRewards.sort((a, b) => b.rating - a.rating);
      case "popular":
        return sortedRewards.sort((a, b) => b.reviews - a.reviews);
      default:
        return sortedRewards; // Return original order for "featured"
    }
  };
  