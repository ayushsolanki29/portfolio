const TechStaks = ({ items }: any) => {
  return (
    <table className="w-full" id="tech_stacks">
      <thead>
        <tr className="m-0 border-t p-0 even:bg-muted">
          <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
            Name
          </th>
          <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
            Role
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item: any, idx: number) => (
          <tr className="m-0 border-t p-0 even:bg-muted" key={idx}>
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
              {item.name}
            </td>
            <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
             {item.role}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TechStaks;
