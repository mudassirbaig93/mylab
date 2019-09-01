import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";

class Pagination extends Component {
  render() {
    const { itemsCount, pageSize, currentPage } = this.props;
    const pagesCount = Math.ceil(itemsCount / pageSize);

    // if single page, no need for pagination
    if (pagesCount === 1) return null;

    const pages = _.range(1, pagesCount + 1); // return array of how many cells needed

    // Copied pagination from bootstrap
    // Also installed lodash library for this
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pages.map(page => (
            <li
              key={page}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <a
                className="page-link"
                onClick={() => {
                  this.props.onPageChange(page);
                }}
              >
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

// This is how we do the type checking.
// ! Note that we installed prop type library first
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
