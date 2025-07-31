import FilterAltIcon from "@mui/icons-material/FilterAlt";
import React from "react";
import { useEffect, useRef, useState } from "react";
import SelectFilterComponent from "./SelectFilterComponent";
import NumericFilterComponent from "./NumericFilterComponent";
import TextFilterComponent from "./TextFilterComponent";
export default function EnhancedTableHeadFilterArea(props) {
  const [FiltereOpened, setFiltereOpened] = useState(false);
  const [checked, setChecked] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const wrapperRef = useRef(null);
  const filterRef = useRef(null);

  useEffect(() => {
    const tempArray = [];
    const tempArrayBool = [];
    props.rows.forEach((row) => {
      tempArray.push(row[props.headCell.id].toString());
    });
    var unique = tempArray.filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    });
    unique.forEach((element) => {
      tempArrayBool.push(false);
    });
    setSelectedItems(unique);
    setChecked(tempArrayBool);

    const handleOutsideClick = (event) => {
      if (
        (event.target.parentElement &&
          event.target.parentElement.role &&
          event.target.parentElement.role == "listbox") ||
        (event.target.parentElement &&
          event.target.parentElement.role &&
          event.target.parentElement.role == "presentation")
      )
        return;
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setFiltereOpened(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [props.rows]);
  useEffect(() => {
    if (props.selectedColumn !== props.headCell.id) setFiltereOpened(false);
  }, [props.selectedColumn]);

  const createFilterHandler = (property) => (event) => {
    setFiltereOpened(!FiltereOpened);
    props.setSelectedColumn(props.headCell.id);
  };

  const checkFilter = (head) => {
    if (head.isSelect)
      return (
        <>
          <FilterAltIcon
            onClick={createFilterHandler(props.headCell.id)}
            className="clickable-table-icon"
            sx={{
              fontSize: "20px",
              position: "relative",
              top: "5px",
            }}
          />
          <div ref={filterRef}>
            <SelectFilterComponent
              filteredOpen={FiltereOpened}
              selectedItems={selectedItems}
              checked={checked}
              filter={props.filter}
              head={props.headCell}
              setChecked={setChecked}
            />
          </div>
        </>
      );
    if (head.numeric)
      return (
        <>
          <FilterAltIcon
            onClick={createFilterHandler(props.headCell.id)}
            className="clickable-table-icon"
            sx={{
              fontSize: "20px",
              position: "relative",
              top: "5px",
            }}
          />
          <div ref={filterRef}>
            <NumericFilterComponent
              head={props.headCell}
              filteredOpen={FiltereOpened}
              filter={props.filter}
            />
          </div>
        </>
      );
    if (head.button) {
      return <></>;
    } else
      return (
        <>
          <FilterAltIcon
            onClick={createFilterHandler(props.headCell.id)}
            className="clickable-table-icon"
            sx={{
              fontSize: "20px",
              position: "relative",
              top: "5px",
            }}
          />
          <div ref={filterRef}>
            <TextFilterComponent
              head={props.headCell}
              filteredOpen={FiltereOpened}
              filter={props.filter}
            />
          </div>
        </>
      );
  };

  return (
    <span ref={props.headCell.isSelect ? wrapperRef : null}>
      {checkFilter(props.headCell)}
    </span>
  );
}
