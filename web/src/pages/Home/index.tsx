import { useForm, SubmitHandler } from "react-hook-form";
import dayjs from "dayjs";
import * as Api from "../../helpers/fetch";
import { useCallback, useState } from "preact/hooks";

type FormInputs = {
  days: string;
  folat_share: string;
  start_day: string;
  end_day: string;
};

export function Home() {
  const [loading, setLoading] = useState(false);
  const [columns, setColumns] = useState<string[]>([]);
  const [dataList, setDataList] = useState<string[][]>([]);
  //
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

  const onSubmit: SubmitHandler<FormInputs> = async (params) => {
    try {
      params.start_day = dayjs(params.start_day).format("YYYYMMDD");
      params.end_day = dayjs(params.end_day).format("YYYYMMDD");

      setLoading(true);

      const result = await Api.SendData(params);

      setColumns(result.resp.columns);
      setDataList(result.resp.values);
      setLoading(false);
    } catch (error) {
      window.alert("send error: " + error?.message);
      setLoading(false);
    }
  };

  const onUpdateClick = async () => {
    try {
      await Api.UpdateData();
      alert("update ok");
    } catch (error) {
      alert("update error: " + error?.message);
    }
  };

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
        <h2 className="text-2xl font-bold text-slate-700">筛选条件设置</h2>
        <Input
          label="连续上涨天数"
          register={register}
          name="days"
          type="number"
          errors={errors}
        />
        <Input
          label="流通股本"
          register={register}
          name="folat_share"
          type="number"
          errors={errors}
        />
        <Input
          label="开始日期"
          register={register}
          name="start_day"
          type="date"
          errors={errors}
        />
        <Input
          label="结束日期"
          register={register}
          name="end_day"
          type="date"
          errors={errors}
        />

        <div className="flex flex-row space-x-4 pt-4">
          <button
            type="button"
            className="flex flex-1 justify-center rounded-lg bg-indigo-600 p-3 font-semibold text-white shadow-sm hover:bg-indigo-500"
            onClick={() => onUpdateClick()}
          >
            更新
          </button>
          <button
            type="submit"
            className="flex flex-1 justify-center rounded-lg bg-indigo-600 p-3 font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            发送
          </button>
        </div>
      </form>
      {/* table */}
      <div className="flex-1 rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-slate-700">
          筛选结果
        </h2>
        <ResultRender />
      </div>
    </div>
  );
}
