// import { useState, type ReactNode } from "react";
// import { ChevronsUpDownIcon } from "lucide-react";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   CommandEmpty,
//   CommandInput,
//   CommandItem,
//   CommandList,
//   CommandResponsiveDialog,
// } from "./ui/command";

// type CommandSelectProps = {
//   options: Array<{
//     id: string;
//     value: string;
//     children: ReactNode;
//   }>;
//   onSelect: (value: string) => void;
//   onSearch?: (value: string) => void;
//   value: string;
//   placeholder?: string;
//   isSearchable?: boolean;
//   className?: string;
// };

// export const CommandSelect = ({
//   options,
//   onSelect,
//   onSearch,
//   value,
//   placeholder = "Select an option",
//   isSearchable = true,
//   className,
// }: CommandSelectProps) => {
//   const [open, setOpen] = useState(false);
//   const selectedOption = options.find((option) => option.id === value);

//   const handleOpenChange = (opened: boolean) => {
//     onSearch?.("");
//     setOpen(opened);
//   };

//   return (
//     <>
//       <Button
//         type="button"
//         variant="outline"
//         onClick={() => setOpen(true)}
//         className={cn(
//           "h-9 justify-between font-normal px-2",
//           !selectedOption && "text-muted-foreground",
//           className
//         )}
//         aria-expanded={open}
//         aria-controls="command-menu">
//         <div>{selectedOption?.children || placeholder}</div>
//         <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//       </Button>
//       <CommandResponsiveDialog
//         shouldFilter={!onSearch}
//         open={open}
//         onOpenChange={handleOpenChange}>
//         <CommandInput
//           placeholder={placeholder || "Search..."}
//           onValueChange={onSearch}
//           disabled={!isSearchable}
//         />
//         <CommandList>
//           <CommandEmpty>
//             <span className="text-muted-foreground text-sm">
//               No options found.
//             </span>
//           </CommandEmpty>
//           {options.map((option) => (
//             <CommandItem
//               key={option.id}
//               value={option.value}
//               onSelect={() => {
//                 onSelect(option.id);
//                 setOpen(false);
//               }}>
//               {option.children}
//             </CommandItem>
//           ))}
//         </CommandList>
//       </CommandResponsiveDialog>
//     </>
//   );
// };



import { useState, type ReactNode, useEffect, useRef } from "react";
import { ChevronsUpDownIcon, XIcon, LoaderIcon, AlertCircleIcon, SearchIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandResponsiveDialog,
} from "./ui/command";

type CommandSelectProps = {
  options: Array<{
    id: string;
    value: string;
    children: ReactNode;
  }>;
  onSelect: (value: string) => void;
  onSearch?: (value: string) => void;
  value: string;
  placeholder?: string;
  emptyMessage?: string;
  isSearchable?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  error?: string;
  allowClear?: boolean;
  className?: string;
};

export const CommandSelect = ({
  options,
  onSelect,
  onSearch,
  value,
  placeholder = "Select an option",
  emptyMessage,
  isSearchable = true,
  disabled = false,
  isLoading = false,
  error,
  allowClear = true,
  className,
}: CommandSelectProps) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const selectedOption = options.find((option) => option.id === value);
  const hasValue = !!selectedOption;
  const hasOptions = options.length > 0;

  // Debounced search
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      onSearch?.(searchValue);
    }, 200);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchValue, onSearch]);

  const handleOpenChange = (opened: boolean) => {
    if (!opened) {
      setSearchValue("");
      onSearch?.("");
    }
    setOpen(opened);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    
    // Open on Enter or Space
    if ((e.key === "Enter" || e.key === " ") && !open) {
      e.preventDefault();
      setOpen(true);
    }
    
    // Clear on Delete/Backspace when focused and has value
    if ((e.key === "Delete" || e.key === "Backspace") && hasValue && allowClear && !open) {
      e.preventDefault();
      onSelect("");
    }
  };

  const getDisplayContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center gap-2 text-muted-foreground">
          <LoaderIcon className="h-4 w-4 animate-spin" />
          <span>Loading...</span>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center gap-2 text-destructive">
          <AlertCircleIcon className="h-4 w-4" />
          <span className="truncate">Error loading options</span>
        </div>
      );
    }

    if (selectedOption) {
      return selectedOption.children;
    }

    return (
      <span className="text-muted-foreground">
        {placeholder}
      </span>
    );
  };

  const getEmptyMessage = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center gap-2 py-6 text-muted-foreground">
          <LoaderIcon className="h-4 w-4 animate-spin" />
          <span>Loading options...</span>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center gap-2 py-6 text-destructive">
          <AlertCircleIcon className="h-4 w-4" />
          <span>Failed to load options</span>
        </div>
      );
    }


    return (
      <div className="flex items-center justify-center gap-2 py-6 text-muted-foreground">
        <SearchIcon className="h-4 w-4" />
        <span>{emptyMessage || "No options found"}</span>
      </div>
    );
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={() => !disabled && setOpen(true)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={cn(
          "h-10 justify-between font-normal px-3 text-left",
          !hasValue && "text-muted-foreground",
          disabled && "cursor-not-allowed opacity-50",
          error && "border-destructive focus-visible:ring-destructive",
          className
        )}
        aria-expanded={open}
        aria-controls="command-menu"
        aria-label={selectedOption ? `Selected: ${selectedOption.value}` : placeholder}
      >
        <div className="flex-1 truncate pr-2">
          {getDisplayContent()}
        </div>
        
        <div className="flex items-center gap-1">
          {hasValue && allowClear && !disabled && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 hover:bg-muted"
              onClick={handleClear}
              aria-label="Clear selection"
              tabIndex={-1}
            >
              <XIcon className="h-3 w-3" />
            </Button>
          )}
          <ChevronsUpDownIcon className="h-4 w-4 shrink-0 opacity-50" />
        </div>
      </Button>

      <CommandResponsiveDialog
        shouldFilter={!onSearch}
        open={open}
        onOpenChange={handleOpenChange}
      >
        {isSearchable && (
          <CommandInput
            placeholder={`Search ${placeholder.toLowerCase()}...`}
            value={searchValue}
            onValueChange={setSearchValue}
            disabled={!isSearchable || isLoading}
            className="border-none focus:ring-0"
          />
        )}
        
        <CommandList className="max-h-[300px]">
          <CommandEmpty>
            {getEmptyMessage()}
          </CommandEmpty>
          
          {hasOptions && !isLoading && !error && options.map((option) => (
            <CommandItem
              key={option.id}
              value={option.value}
              onSelect={() => {
                onSelect(option.id);
                setOpen(false);
              }}
              className={cn(
                "cursor-pointer transition-colors",
                value === option.id && "bg-accent text-accent-foreground"
              )}
              aria-selected={value === option.id}
            >
              <div className="flex-1">
                {option.children}
              </div>
              {value === option.id && (
                <div className="ml-2 text-primary">
                  ✓
                </div>
              )}
            </CommandItem>
          ))}
        </CommandList>
      </CommandResponsiveDialog>
    </>
  );
};