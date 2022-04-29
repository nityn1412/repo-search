import {IconButton, InputBase, Paper} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import * as React from "react";
import PropTypes from "prop-types";

const SearchBar = (props) => {
    let { onSearch, searchInput, onChangeSearchInput } = props
    const [input, setInput] = React.useState(searchInput || '')
    if (!onSearch) {
        onSearch = (() => {})
    }
    if (!onChangeSearchInput) {
        onChangeSearchInput = (() => {})
    }
    const keyDown = (e) => {
        if(e.keyCode === 13){
            onSearch(input)
        }
    }
    return (
        <Paper
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300, mb: 2 }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search"
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => {
                    setInput(e.target.value)
                    onChangeSearchInput(e.target.value)
                }}
                onKeyDown={keyDown}
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" onClick={() => {
                onSearch(input)
            }}>
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}
SearchBar.propTypes = {
    onSearch: PropTypes.func,
    searchInput: PropTypes.string,
    onChangeSearchInput: PropTypes.func,
};

export default SearchBar;
