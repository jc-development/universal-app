import React, { Component } from 'react';
// remember to import the filterColors module

export default class Quiver extends Component {
  constructor() {
    super();

    this.organizeQuiversByModel = this.organizeQuiversByModel.bind(this);
    this.handleLoadQuiverModelsClick = this.handleLoadQuiverModelsClick.bind(this);
    this.showProductDetail = this.showProductDetail.bind(this);

    this.state = {
      activeQuiver: null,
      active1PieceModels: { piece: 1, arrow: 4 },
      active2PieceModels: { piece: 2, arrow: 4 },
      piece1Arrow4: [],
      piece1Arrow6: [],
      piece2Arrow4: [],
      piece2Arrow6: [],

    };
  }

  handleLoadQuiverModelsClick(model) {
    this.setState({
      [`active${model.piece}PieceModels`]: {piece: model.piece,  arrow: model.arrow}
    });
  }

  organizeQuiversByModel(model) {
    let piece1Arrow4 = [];
    let piece1Arrow6 = [];
    let piece2Arrow4 = [];
    let piece2Arrow6 = [];

    this.props.quivers.map(quiverArr => {
      quiverArr.map(quiver => {
        switch(quiver.node.product.title) {
          case 'Elite 1-Piece Quiver (4 Arrow)':
            piece1Arrow4.includes(quiver) ? false : piece1Arrow4.push(quiver);
            this.setState({piece1Arrow4});
          break;

          case 'Elite 1-Piece Quiver (6 Arrow)':
            piece1Arrow6.includes(quiver) ? false : piece1Arrow6.push(quiver);
            this.setState({piece1Arrow6});
          break;

          case 'Elite 2-Piece Quiver (4 Arrow)':
            piece2Arrow4.includes(quiver) ? false : piece2Arrow4.push(quiver);
            this.setState({piece2Arrow4});
          break;

          case 'Elite 2-Piece Quiver (6 Arrow)':
            piece2Arrow6.includes(quiver) ? false : piece2Arrow6.push(quiver);
            this.setState({piece2Arrow6});
          break;

          default:
          break;
        }
      });
    });
  }

  showProductDetail(quiver) {
    this.props.selectProduct({quiver: quiver});
    this.setState({
      activeQuiver: {
        title: quiver.node.title,
        model: quiver.node.product.title
      }
    });
  }

  componentDidMount() {
    if (this.props.quivers) {
      this.organizeQuiversByModel({piece: 1, handle: 'Elite 1-Piece Quiver (4 Arrow)'});
      this.organizeQuiversByModel({piece: 1, handle: 'Elite 2-Piece Quiver (4 Arrow)'});

      this.handleLoadQuiverModelsClick({piece: 1, arrow: 4, handle: 'Elite 1-Piece Quiver (4 Arrow)'});
      this.handleLoadQuiverModelsClick({piece: 2, arrow: 4, handle: 'Elite 2-Piece Quiver (4 Arrow)'});
    }
  }

  componentDidUpdate(prevProps, nextState) {
    if (this.props.quivers !== prevProps.quivers) {
      this.organizeQuiversByModel({piece: 1, handle: 'Elite 1-Piece Quiver (4 Arrow)'});
      this.organizeQuiversByModel({piece: 1, handle: 'Elite 2-Piece Quiver (4 Arrow)'});

      this.handleLoadQuiverModelsClick({piece: 1, arrow: 4, handle: 'Elite 1-Piece Quiver (4 Arrow)'});
      this.handleLoadQuiverModelsClick({piece: 2, arrow: 4, handle: 'Elite 2-Piece Quiver (4 Arrow)'});
    }
  }


  render() {
    // console.log('this.props.quivers: ', this.props.quivers);
    // console.log('this.state quivers: ', this.state);

    const isActive = (activeQuiver) => {
      if ( (this.state.activeQuiver.title === Object.keys(activeQuiver)[0]) && (this.state.activeQuiver.model === Object.values(activeQuiver)[0]) ) {
        return 'active';
      } else {
        null;
      }
    };

    const check1PieceClassName = (name) => JSON.stringify(this.state.active1PieceModels) === JSON.stringify(name) ? "active" : null;
    const check2PieceClassName = (name) => JSON.stringify(this.state.active2PieceModels) === JSON.stringify(name) ? "active" : null;

    const showQuiverNodes = (model) => {
      return this.state[`piece${model.piece}Arrow${model.arrow}`].map( (quiver, i) => {
        if (quiver.node.availableForSale) return <li key={i} className={this.state.activeQuiver !== null ? isActive({[quiver.node.title]: quiver.node.product.title}) : null}><img className="product-image" src={quiver.node.image.src} title={quiver.node.title} alt={`Elite Archery Quiver in ${quiver.node.title}`} onClick={() => this.showProductDetail( quiver )} /><span>{quiver.node.title}</span></li>;
      });
    };

    return (
      <div id="accessory-type">
        <h6>Quivers</h6>
        <div className="container">
          <div>
            <header>
              <h6>1 Piece Quiver</h6>
              <nav>
                <ul>
                  <li className={check1PieceClassName({ piece: 1, arrow: 4 })} onClick={() => this.handleLoadQuiverModelsClick({piece: 1, arrow: 4, handle: 'Elite 1-Piece Quiver (4 Arrow)'})}>4 Arrow</li>
                  <li className={check1PieceClassName({ piece: 1, arrow: 6 })} onClick={() => this.handleLoadQuiverModelsClick({piece: 1, arrow: 6, handle: 'Elite 1-Piece Quiver (6 Arrow)'})}>6 Arrow</li>
                </ul>
              </nav>
            </header>
            <ul className="items">
             { showQuiverNodes(this.state.active1PieceModels) }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
