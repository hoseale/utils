/**
 * 数组异步遍历
 * @param data
 * @param callback 回调函数，回传当前遍历项及下标，next函数调用执行下一项
 *
 */
type AsyncEachParam<T = any, P = any> = {
  callback: (current: T, index: number, next: (customData?: P) => Promise<void>, customData?: P) => Promise<void>;
  data: T[];
};
export async function asyncEach<T = any, P = any>(
  data: AsyncEachParam<T, P>['data'],
  callback: AsyncEachParam<T, P>['callback'],
): Promise<void> {
  const len = data.length;
  const dispatch = async (index: number, customData?: P) => {
    if (index >= len) {
      return;
    }
    const current = data[index];
    await callback(
      current,
      index,
      async (cData) => {
        await dispatch(index + 1, cData);
      },
      customData,
    );
  };

  if (data.length) {
    await dispatch(0);
  }
}
