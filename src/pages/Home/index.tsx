import { useForm, SubmitHandler } from "react-hook-form";
import dayjs from "dayjs";
import { SendData, UpdateData, IResponseData } from "../../helpers/fetch";
import { useCallback, useState } from "preact/hooks";

type FormInputs = {
  days: string;
  folat_share: string;
  start_day: string;
  end_day: string;
};

// const sendFetcher = (url: string, params: FormInputs) => {
//   const paramsStr = new URLSearchParams(params).toString();
//   return fetch(url + "?" + paramsStr).then((res) => res.json());
// };

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
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    console.warn(data);
    setLoading(true);
    SendData(data)
      .then((res) => {
        setColumns(res.resp.columns || []);
        setDataList(res.resp.values);
      })
      .catch((err) => {
        window.alert("请求失败" + err?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const [dataList, setDataList] = useState<string[][]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const Input = ({ label, register, name, type, errors }) => (
    <div>
      <label className="font-medium text-slate-600">{label}</label>
      <div className="mt-2">
        <input
          type={type}
          {...register(name, { required: true })}
          className="block w-full rounded-md border-0 py-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300  transition-all focus:ring-2 focus:ring-indigo-600"
        />
      </div>
      {errors[name] && (
        <span className="my-1 block text-sm text-red-500">
          This field is required
        </span>
      )}
    </div>
  );

  const ResultRender = useCallback(() => {
    if (loading) {
      return <span>LOADING...</span>;
    } else if (columns.length > 0 && dataList.length > 0) {
      return (
        <table className="w-full table-auto border-collapse">
          <thead className="bg-slate-200">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="border border-slate-300 px-4 py-3 text-left font-bold text-slate-600"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataList.map((data, index) => (
              <tr
                key={index}
                className="bg-white even:bg-slate-50 hover:bg-slate-100"
              >
                {data.map((val) => (
                  <td
                    key={val}
                    className="border px-4 py-3 text-left text-slate-500"
                  >
                    {val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else {
      return <span>使用左侧表单进行数据查询</span>;
    }
  }, [loading, columns, dataList]);

  return (
    <div class="container mx-auto flex h-full flex-row space-x-8 overflow-y-scroll py-12">
      <form
        className="flex w-[360px] flex-col space-y-4 rounded-lg bg-white p-6 shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-bold text-slate-700">Search Form</h2>
        <Input
          label="Days"
          register={register}
          name="days"
          type="number"
          errors={errors}
        />
        <Input
          label="Folat Share"
          register={register}
          name="folat_share"
          type="number"
          errors={errors}
        />
        <Input
          label="StartDay"
          register={register}
          name="start_day"
          type="date"
          errors={errors}
        />
        <Input
          label="EndDay"
          register={register}
          name="end_day"
          type="date"
          errors={errors}
        />

        <div className="flex flex-row space-x-4 pt-4">
          <button
            type="button"
            className="flex flex-1 justify-center rounded-lg bg-indigo-600 p-3 font-semibold text-white shadow-sm hover:bg-indigo-500"
            onClick={() => {
              UpdateData()
                .then(() => {
                  alert("update ok");
                })
                .catch((err) => {
                  alert("update error" + err?.message);
                });
            }}
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
        <ResultRender />
      </div>
    </div>
  );
}
