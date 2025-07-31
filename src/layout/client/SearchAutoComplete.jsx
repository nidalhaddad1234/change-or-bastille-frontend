import { Box, Typography, Autocomplete, TextField } from "@mui/material";

import { getCountryCode } from "../../helpers";
export default function SearchAutoComplete(props) {
  const { options, handleChangeSelectedItem, text, handleChange, setText } =
    props;
  return (
    <>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={options}
        sx={{
          width: { xs: 300, md: 600, lg: 600 },
          "& .css-kp3d8s-MuiFormControl-root-MuiTextField-root": {
            "& .MuiOutlinedInput-root": {
              padding: "10px 0 !important",
            },
          },
        }}
        getOptionLabel={(option) =>
          typeof option === "string"
            ? option
            : option.metalName
            ? option.metalName
            : option.currencyName
        }
        autoComplete
        filterOptions={(x) => x}
        includeInputInList
        filterSelectedOptions
        onChange={handleChangeSelectedItem}
        value={text}
        noOptionsText="Aucun résultat trouvé"
        onInputChange={(event, newValue) => {
          handleChange(event);
          setText(newValue);
        }}
        renderOption={(props, option) => {
          return (
            <Box
              key={option._id}
              itemID={option._id}
              type={option.type ? option.type : "bills"}
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <img
                loading="lazy"
                width="20"
                src={
                  option.photo
                    ? option.photo
                    : `https://flagsapi.com/${getCountryCode(
                        option.iso.toUpperCase()
                      )}/flat/64.png`
                }
                srcSet={
                  option.photo
                    ? option.photo
                    : `https://flagsapi.com/${getCountryCode(
                        option.iso.toUpperCase()
                      )}/flat/64.png`
                }
                alt=""
              />
              {option.metalName ? option.metalName : option.currencyName}
            </Box>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            size="small"
            sx={{
              "& .css-1q60rmi-MuiAutocomplete-endAdornment": {
                display: "none",
              },
              fieldset: {
                display: "none",
              },
            }}
            placeholder="Rechercher..."
          />
        )}
      />
    </>
  );
}
