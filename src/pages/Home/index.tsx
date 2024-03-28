export function Home() {
  return (
    <div class="container mx-auto py-12 flex flex-row space-x-8 h-full overflow-y-scroll">
      {/* form */}
      <aside className="bg-white w-[360px] rounded-lg shadow-md p-6 flex flex-col space-y-6">
        <h2 className="font-bold text-2xl text-slate-700">Search Form</h2>
        {/* input 1 */}
        <div>
          <label className="font-medium text-slate-600">Days</label>
          <div className="mt-2">
            <input
              type="number"
              className="block w-full rounded-md border-0 py-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300  focus:ring-2 focus:ring-indigo-600 transition-all"
            />
          </div>
        </div>
        {/* input 2 */}
        <div>
          <label className="font-medium text-slate-600">Folat Share</label>
          <div className="mt-2">
            <input
              type="number"
              className="block w-full rounded-md border-0 py-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300  focus:ring-2 focus:ring-indigo-600 transition-all"
            />
          </div>
        </div>
        {/* input 3 */}
        <div>
          <label className="font-medium text-slate-600">StartDay</label>
          <div className="mt-2">
            <input
              type="date"
              className="block w-full rounded-md border-0 py-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300  focus:ring-2 focus:ring-indigo-600 transition-all"
            />
          </div>
        </div>
        {/* input 4 */}
        <div>
          <label className="font-medium text-slate-600">EndDay</label>
          <div className="mt-2">
            <input
              type="date"
              className="block w-full rounded-md border-0 py-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300  focus:ring-2 focus:ring-indigo-600 transition-all"
            />
          </div>
        </div>

        <div className="flex flex-row space-x-4 pt-4">
          <button className="flex flex-1 justify-center rounded-lg bg-indigo-600 p-3 font-semibold text-white shadow-sm hover:bg-indigo-500">
            Update
          </button>
          <button className="flex flex-1 justify-center rounded-lg bg-indigo-600 p-3 font-semibold text-white shadow-sm hover:bg-indigo-500">
            Send
          </button>
        </div>
      </aside>

      {/* table */}
      <div className="flex-1 bg-white rounded-lg shadow-md p-6">
        <h2 className="font-bold text-2xl text-slate-700 mb-6">
          Search Result
        </h2>
        <table className="border-collapse table-auto w-full">
          <thead className="bg-slate-200">
            <tr>
              {[1, 2, 3, 4, 5].map((item) => (
                <th
                  key={item}
                  className="border border-slate-300 font-bold text-left px-4 py-3 text-slate-600"
                >
                  Col {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <tr
                key={item}
                className="bg-white even:bg-slate-50 hover:bg-slate-100"
              >
                {[1, 2, 3, 4, 5].map((val) => (
                  <td
                    key={val}
                    className="border text-left px-4 py-3 text-slate-500"
                  >
                    Value {val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
