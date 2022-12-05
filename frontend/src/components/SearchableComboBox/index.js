import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import PropTypes from "prop-types";

const filterOptions = createFilterOptions({ matchFrom: "any", limit: 100 });

const SearchableComboBox = (props) => {
  const {
    _id,
    name,
    label,
    width,
    onChange,
    required,
    items = [],
    error,
    helperText,
    selectedValues,
    multi,
    disabled,
    limitTags,
  } = props;

  const newItems = multi
    ? [{ _id: "All", name: "Select All" }, ...items]
    : items;

  const [allSelected, setAllSelected] = useState(false);

  useEffect(() => {
    if (multi) {
      if (items.length !== (selectedValues || []).length) {
        setAllSelected(false);
      } else {
        setAllSelected(true);
      }
    }
  }, [items, selectedValues, multi]);

  return (
    <>
      <Autocomplete
        filterOptions={filterOptions}
        fullWidth
        multiple={multi ? true : false}
        limitTags={limitTags ? 2 : -1}
        disableCloseOnSelect={multi ? true : false}
        size="small"
        id={`auto-${_id || name}`}
        options={newItems}
        getOptionLabel={(option) => option.name || ""}
        style={{ width: width }}
        value={selectedValues || (multi ? [] : null)}
        disabled={disabled}
        onChange={(event_old, newValue, reason, details) => {
          const event = {
            disablePersist: true,
            target: {
              name: name,
              value: newValue || null,
            },
          };
          if (multi && details) {
            if (details.option._id === "All") {
              if (!allSelected) {
                event.target.value = items || null;
                setAllSelected(true);
              } else {
                event.target.value = null;
                setAllSelected(false);
              }
            }
          }
          onChange(event);
        }}
        getOptionSelected={(options, value) => {
          return options._id === value.name;
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            id={_id}
            name={name}
            error={error}
            helperText={helperText}
            autoComplete="off"
            margin="dense"
            size="small"
            label={label}
            required={required}
            variant="outlined"
          />
        )}
      />
    </>
  );
};

SearchableComboBox.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  width: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  error: PropTypes.any,
  selectedValues: PropTypes.any,
  helperText: PropTypes.any,
  multi: PropTypes.any,
  disabled: PropTypes.bool,
  limitTags: PropTypes.bool,
};
export default SearchableComboBox;

// import React from "react";
// import TextField from "@material-ui/core/TextField";
// import Autocomplete, {
//   createFilterOptions,
// } from "@material-ui/lab/Autocomplete";
// import PropTypes from "prop-types";

// const filterOptions = createFilterOptions({ matchFrom: "any", limit: 100 });

// const SearchableComboBox = (props) => {
//   const {
//     id,
//     name,
//     label,
//     width,
//     onChange,
//     items,
//     error,
//     helperText,
//     selectedValues,
//     multi,
//     disabled,
//     limitTags,
//     required,
//   } = props;
//   return (
//     <>
//       <Autocomplete
//         filterOptions={filterOptions}
//         fullWidth
//         multiple={multi ? true : false}
//         limitTags={limitTags ? 2 : -1}
//         disableCloseOnSelect={multi ? true : false}
//         size="small"
//         id={`auto-${id || name}`}
//         options={items}
//         getOptionLabel={(option) => option.name || ""}
//         style={{ width: width }}
//         value={selectedValues || (multi ? [] : null)}
//         disabled={disabled}
//         onChange={(event_old, newValue) => {
//           const event = {
//             disablePersist: true,
//             target: {
//               name: name,
//               value: newValue || null,
//             },
//           };
//           onChange(event);
//         }}
//         getOptionSelected={(options, value) => {
//           return options.id === value.id;
//         }}
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             id={id}
//             name={name}
//             error={error}
//             helperText={helperText}
//             autoComplete="off"
//             margin="dense"
//             label={label}
//             required={required}
//             variant="outlined"
//           />
//         )}
//       />
//     </>
//   );
// };
// SearchableComboBox.propTypes = {
//   id: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   label: PropTypes.string,
//   width: PropTypes.number,
//   onChange: PropTypes.func.isRequired,
//   items: PropTypes.array.isRequired,
//   error: PropTypes.any,
//   selectedValues: PropTypes.any,
//   helperText: PropTypes.any,
//   multi: PropTypes.any,
//   disabled: PropTypes.bool,
//   limitTags: PropTypes.bool,
//   required: PropTypes.any,
// };
// export default SearchableComboBox;
