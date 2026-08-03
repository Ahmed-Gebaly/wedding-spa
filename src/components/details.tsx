const rows = [
  ["Ceremony", "7:00 PM"],
  ["Dinner", "8:30 PM"],
  ["First Dance", "10:00 PM"],
  ["After Party", "11:00 PM"],
];

export default function Details() {
  return (
    <section className="content-shell py-10 sm:py-16">
      <div className="section-card p-6 sm:p-10">
        <h3 className="text-center text-4xl sm:text-5xl">Wedding Details</h3>
        <div className="mt-6 overflow-x-auto rounded-xl bg-white">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr>
                <th className="p-4">Event</th>
                <th className="p-4">Time</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, value]) => (
                <tr key={label}>
                  <td className="p-4">{label}</td>
                  <td className="p-4 text-[var(--ink-soft)]">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
