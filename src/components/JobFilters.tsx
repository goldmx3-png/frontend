import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, X } from "lucide-react";

interface JobFiltersProps {
  activeFilters: string[];
  onFilterChange: (filters: string[]) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const availableFilters = [
  "Java Engineer",
  "Backend Engineer", 
  "Full Stack Engineer",
  "Within US",
  "Full-time",
  "Remote",
  "Entry Level",
  "Mid Level",
  "H1B Only"
];

export function JobFilters({ 
  activeFilters, 
  onFilterChange, 
  searchQuery, 
  onSearchChange 
}: JobFiltersProps) {
  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      onFilterChange(activeFilters.filter(f => f !== filter));
    } else {
      onFilterChange([...activeFilters, filter]);
    }
  };

  const removeFilter = (filter: string) => {
    onFilterChange(activeFilters.filter(f => f !== filter));
  };

  return (
    <div className="space-y-4 p-4 bg-card border-b border-border">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search by title or company..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Available Filters */}
      <div className="flex flex-wrap gap-2">
        {availableFilters.map((filter) => (
          <Badge
            key={filter}
            variant={activeFilters.includes(filter) ? "default" : "outline"}
            className={`cursor-pointer transition-colors ${
              activeFilters.includes(filter) 
                ? "bg-primary text-primary-foreground" 
                : "hover:bg-primary/10"
            }`}
            onClick={() => toggleFilter(filter)}
          >
            {filter}
          </Badge>
        ))}
        <Button variant="outline" size="sm" className="h-6 text-xs">
          <Filter className="w-3 h-3 mr-1" />
          Edit Filters
        </Button>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground mr-2">Active filters:</span>
          {activeFilters.map((filter) => (
            <Badge
              key={filter}
              variant="secondary"
              className="cursor-pointer"
            >
              {filter}
              <X 
                className="w-3 h-3 ml-1" 
                onClick={(e) => {
                  e.stopPropagation();
                  removeFilter(filter);
                }}
              />
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            className="h-6 text-xs text-muted-foreground"
            onClick={() => onFilterChange([])}
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}