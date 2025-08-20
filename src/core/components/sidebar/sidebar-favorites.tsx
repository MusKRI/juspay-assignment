export function SidebarFavorites() {
  return (
    <div className="px-4 pt-5 flex flex-col gap-1">
      <div className="flex items-center gap-5 px-2">
        <button className="cursor-pointer text-foreground/40 text-sm">
          Favorites
        </button>
        <button className="cursor-pointer text-foreground/20 text-sm">
          Recently
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 px-3 py-1">
          <span className="size-2 rounded-full bg-foreground/20" />
          <span className="text-sm">Overview</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1">
          <span className="size-2 rounded-full bg-foreground/20" />
          <span className="text-sm">Projects</span>
        </div>
      </div>
    </div>
  );
}
