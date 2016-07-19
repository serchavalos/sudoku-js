import React from 'react'

export default React.createClass({
  render() {
    let value = this.props.value || '&nbsp;';
    let cssClasses = this.props.cssClasses || [];

    return (
      <div className={ 'sudoku-cell ' + cssClasses.join(' ') } onClick={this.props.onClick}>
        <span dangerouslySetInnerHTML={{ __html: value }} />
      </div>
    )
  }
})
