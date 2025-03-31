import colors from "@/styles/colors.json";

export function BackgroundSelector({ slug }: { slug: string }) {
  return (
    <div>
      <ul className="flex flex-wrap gap-1.5">
        {colors.solid.map((i) => (
          <li key={i}>
            <button
              className="size-12 rounded-full hover:cursor-pointer"
              style={{ backgroundColor: i }}
              type="button"
            ></button>
          </li>
        ))}
      </ul>
    </div>
  );
}
