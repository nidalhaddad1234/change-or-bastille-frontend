import { isObject } from "formik";
import LoadingMain from "./utilities/LoadingMain";

export default function LoadedData({ data, children, isObject, fullHeight }) {
  return (
    <>
      {(isObject && data) || (!isObject && data && data.length > 0) ? (
        children
      ) : (
        <LoadingMain fullHeight={fullHeight} />
      )}
    </>
  );
}
