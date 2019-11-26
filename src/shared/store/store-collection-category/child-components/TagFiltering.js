import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { 
  getFilteredCollectionProducts as getFilteredCollectionProductsAction,
  clearFilteredCollectionProducts as clearFilteredCollectionProductsAction
} from '../../../reusable/shopify/collection/actions';

import './../assets/css/tag-filtering.css';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faTimesCircle } from '@fortawesome/fontawesome-free-solid'

class TagFiltering extends Component {

  constructor(props) {
    super(props);

    this.state = {
      filterTags: null,
      selectedFilterOptions: null,
      filterMenuVisible: false,
    };

    this.getTags = this.getTags.bind(this);
    this.handleShowFilters = this.handleShowFilters.bind(this);
    this.handleFilterProducts = this.handleFilterProducts.bind(this);
    this.handleFilterClear = this.handleFilterClear.bind(this);
  }

  componentDidMount () {
    this.getTags(this.props.products)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        filterTags: null,
        selectedFilterOptions: null,
        filterMenuVisible: false,
      }, () =>{
        this.getTags(this.props.products)
      })
    }
  }

  getTags(products) {

    const allTags = products.reduce((acc, current) => [...acc, ...current.tags], []);
    const uniqueFilterTags = [...new Set(allTags)].filter(tag => tag.includes("_"));

    const categories = uniqueFilterTags.reduce((acc, current) => {
      const currentSplit = current.split("_")
      if (acc && acc.hasOwnProperty(currentSplit[0])) {
        return {...acc, [currentSplit[0]]: [...acc[currentSplit[0]], currentSplit[1]]}
      } else {
        return {...acc, [currentSplit[0]]: [currentSplit[1]]}
      }
    }, null)

    this.setState({filterTags: categories})

  }

  handleFilterProducts(property, value) {
    const filtersSelected = this.state.selectedFilterOptions !== null ? [...this.state.selectedFilterOptions, `${property}_${value}`] : [`${property}_${value}`]
    const filteredProducts = this.props.products.filter(product => filtersSelected.every(selectedOption => product.tags.includes(selectedOption)))
    if(filteredProducts.length === 1) {
      document.querySelector('body').removeAttribute("style")
      this.props.history.push(`${this.props.location.pathname}/${filteredProducts[0].handle}`)
    } else {
      this.setState({
        selectedFilterOptions: filtersSelected.length === 0 ? null : filtersSelected,
      }, () => {
        this.props.getFilteredCollectionProducts(filteredProducts)
      })
    }
  }

  handleFilterClear(option) {
    const filtersSelected = this.state.selectedFilterOptions.filter(selectedOption => selectedOption !== option)
    const filteredProducts = this.props.products.filter(product => filtersSelected.every(selectedOption => product.tags.includes(selectedOption)))
    this.setState({
      selectedFilterOptions:  filtersSelected.length === 0 ? null : filtersSelected,
    }, () => {
      this.props.getFilteredCollectionProducts(filteredProducts)
    })
  }

  handleShowFilters(boolean) {
    this.setState({filterMenuVisible: boolean}, () => {
      const body = document.querySelector('body');
      if (boolean) {
        body.setAttribute("style", "overflow:hidden")
      } else {
        body.removeAttribute("style")
      }
    })
  }

  render () {
    
    const {filterTags, selectedFilterOptions, filterMenuVisible} = this.state

    const buildFilterMenu = () => {
      const filters = Object.entries(filterTags).map(property => {
        return (
          <div className="filter-property">
            <h6>{property[0]}</h6>
            <ul>
              {
                property[1].sort().map(value => {
                  if (selectedFilterOptions === null) {
                    return <li><a onClick={() => this.handleFilterProducts(property[0], value)}>{value}</a></li>
                  } else if (!selectedFilterOptions.find(a => a.includes(property[0]))) {
                    return <li><a onClick={() => this.handleFilterProducts(property[0], value)}>{value}</a></li>
                  } else {
                    if (selectedFilterOptions.includes(`${property[0]}_${value}`)) {
                      return <li className="active-filter"><a onClick={() => this.handleFilterClear(`${property[0]}_${value}`)}>{value} <span>Clear</span></a></li>
                    } else {
                      return <li className="disabled-filter">{value}</li>
                    }
                  }
                })
              }
            </ul>
          </div>     
        )
      })
      return filters
    }

    const showFilterMenu = () => {
      if (filterTags !== null) {
        return (
          <Fragment>
            <button className="show-filters" onClick={() => this.handleShowFilters(true)}> <FontAwesomeIcon icon={faBars} className="icon" />Show Filters</button>
            <div className={filterMenuVisible ? "filter-wrapper visible" : "filter-wrapper"}>
              <div className="filter-menu" >
                <button className="close-filters" onClick={() => this.handleShowFilters(false)}><FontAwesomeIcon icon={faTimes} className="icon" />Close Filters</button>
                {buildFilterMenu()}
              </div>
            </div>
          </Fragment>
        )
      }
    }
    
    const showSelectedFilterOptions = () => {
      if (selectedFilterOptions !== null) {
        const selectedFilters = selectedFilterOptions.map(option => {
          return (
            <button className="selected-filter" onClick={() => this.handleFilterClear(option)}>
              {option.replace("_", ": ")}
              <FontAwesomeIcon icon={faTimesCircle} className="icon-remove-filter" />
            </button>
          )
        })
        return <p style={{margin: "0"}}>Selected Filters - {selectedFilters}</p>
      }
    }

    return (
      <Fragment>
        {showFilterMenu()}
        {showSelectedFilterOptions()}
      </Fragment>
    )
  }
}

export default withRouter(connect(null, { 
  getFilteredCollectionProducts: getFilteredCollectionProductsAction,
  clearFilteredCollectionProducts: clearFilteredCollectionProductsAction
})(TagFiltering))