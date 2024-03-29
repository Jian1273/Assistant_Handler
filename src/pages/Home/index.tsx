import { useForm, SubmitHandler } from "react-hook-form";
import dayjs from "dayjs";

type FormInputs = {
  days: number;
  folat_share: number;
  start_day: string;
  end_day: string;
};

export function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      start_day: dayjs().subtract(60, "day").format("YYYY-MM-DD"),
      end_day: dayjs().format("YYYY-MM-DD"),
    },
  });
  const onSubmit: SubmitHandler<FormInputs> = (data) => console.warn(data);

  return (
    <div class="container mx-auto flex h-full flex-row space-x-8 overflow-y-scroll py-12">
      <form
        className="flex w-[360px] flex-col space-y-4 rounded-lg bg-white p-6 shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-bold text-slate-700">Search Form</h2>
        {/* input 1 */}
        <div>
          <label className="font-medium text-slate-600">Days</label>
          <div className="mt-2">
            <input
              type="number"
              {...register("days", { required: true })}
              className="block w-full rounded-md border-0 py-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300  transition-all focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          {errors.days && (
            <span className="my-1 block text-sm text-red-500">
              This field is required
            </span>
          )}
        </div>
        {/* input 2 */}
        <div>
          <label className="font-medium text-slate-600">Folat Share</label>
          <div className="mt-2">
            <input
              type="number"
              {...register("folat_share", { required: true })}
              className="block w-full rounded-md border-0 py-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300  transition-all focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          {errors.folat_share && (
            <span className="my-1 block text-sm text-red-500">
              This field is required
            </span>
          )}
        </div>
        {/* input 3 */}
        <div>
          <label className="font-medium text-slate-600">StartDay</label>
          <div className="mt-2">
            <input
              type="date"
              {...register("start_day", { required: true })}
              className="block w-full rounded-md border-0 py-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300  transition-all focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          {errors.start_day && (
            <span className="my-1 block text-sm text-red-500">
              This field is required
            </span>
          )}
        </div>
        {/* input 4 */}
        <div>
          <label className="font-medium text-slate-600">EndDay</label>
          <div className="mt-2">
            <input
              type="date"
              {...register("end_day", { required: true })}
              className="block w-full rounded-md border-0 py-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300  transition-all focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          {errors.end_day && (
            <span className="my-1 block text-sm text-red-500">
              This field is required
            </span>
          )}
        </div>

        <div className="flex flex-row space-x-4 pt-4">
          <button
            type="button"
            className="flex flex-1 justify-center rounded-lg bg-indigo-600 p-3 font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            Update
          </button>
          <button
            type="submit"
            className="flex flex-1 justify-center rounded-lg bg-indigo-600 p-3 font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            Send
          </button>
        </div>
      </form>
      {/* table */}
      <div className="flex-1 rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-slate-700">
          Search Result
        </h2>
        <table className="w-full table-auto border-collapse">
          <thead className="bg-slate-200">
            <tr>
              {[1, 2, 3, 4, 5].map((item) => (
                <th
                  key={item}
                  className="border border-slate-300 px-4 py-3 text-left font-bold text-slate-600"
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
                    className="border px-4 py-3 text-left text-slate-500"
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
