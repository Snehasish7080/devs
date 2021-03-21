import { MutableRefObject, useCallback, useEffect } from "react";
const useOutsideClick = <
  T extends { contains: (other: Node | null) => boolean }
>(
  ref: MutableRefObject<T | null>,
  onOutsideClick: (isOutside: boolean) => void
) => {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const val = !!(
        ref.current && !ref.current.contains(event.target as Node | null)
      );
      onOutsideClick(val);
    },
    [onOutsideClick, ref]
  );

  const handleRefChange = useCallback(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    handleRefChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
};

export default useOutsideClick;
