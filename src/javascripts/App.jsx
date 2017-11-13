/* eslint-env browser */

import jQuery from "jquery";
import React from "react";
import ReactDOM from "react-dom";

import "../stylesheets/global.css";
import "../stylesheets/bulma.css";
import style from "../stylesheets/bulma.css.json";


jQuery(document).ready(() => {
  const el = document.getElementsByClassName(`${style.tabs}`)[0];
  const children = el.children[0].children;
  const gem = document.getElementById("gem");
  const gemlist = document.getElementById("gemlist");

  children[0].addEventListener("click", function () {
    if (this.classList.contains(`${style["is-active"]}`)) {
      this.classList.remove(`${style["is-active"]}`);
      children[1].classList.add(`${style["is-active"]}`);
      gem.classList.add("hide");
      gemlist.classList.remove("hide");
    } else {
      this.classList.add(`${style["is-active"]}`);
      children[1].classList.remove(`${style["is-active"]}`);
      gem.classList.remove("hide");
      gemlist.classList.add("hide");
    }
  });

  children[1].addEventListener("click", function () {
    if (this.classList.contains(`${style["is-active"]}`)) {
      this.classList.remove(`${style["is-active"]}`);
      children[0].classList.add(`${style["is-active"]}`);
      gem.classList.remove("hide");
      gemlist.classList.add("hide");
    } else {
      this.classList.add(`${style["is-active"]}`);
      children[0].classList.remove(`${style["is-active"]}`);
      gem.classList.add("hide");
      gemlist.classList.remove("hide");
    }
  });
});

class App extends React.Component {
  constructor(props) {
    super(props);
    const gems = [];
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { gems };
  }
  makeGems() {
    const makeGemLists = gem =>
      <tr key={gem.id}>
        <td>{gem.name}</td>
        <td>{gem.version}</td>
        <td>{gem.authors}</td>
        <td>{gem.downloads}</td>
        <td>{gem.licenses}</td>
      </tr>;
    return this.state.gems.map(makeGemLists);
  }
  handleSubmit(e) {
    e.preventDefault();
    document.getElementById("page").classList.add("is-active");
    const formData = new FormData();
    formData.append("file", document.getElementById("file").files[0]);
    jQuery.ajax({
      type: "POST",
      url: "/gem",
      processData: false,
      contentType: false,
      data: formData,
      success: (data) => {
        const newGems = data.map(gem => ({
          id: (Date.now() + Math.random()),
          name: gem[0],
          info: gem[gem.length - 1].info,
          downloads: gem[gem.length - 1].downloads,
          version: gem[gem.length - 1].version,
          version_downloads: gem[gem.length - 1].version_downloads,
          platform: gem[gem.length - 1].platform,
          authors: gem[gem.length - 1].authors,
          licenses: gem[gem.length - 1].licenses,
          metadata: gem[gem.length - 1].metadata,
          sha: gem[gem.length - 1].sha,
          project_uri: gem[gem.length - 1].project_uri,
          gem_uri: gem[gem.length - 1].gem_uri,
          homepage_uri: gem[gem.length - 1].homepage_uri,
          wiki_uri: gem[gem.length - 1].wiki_uri,
          documentation_uri: gem[gem.length - 1].documentation_uri,
          mailing_list_uri: gem[gem.length - 1].mailing_list_uri,
          source_code_uri: gem[gem.length - 1].source_code_uri,
          bug_tracker_uri: gem[gem.length - 1].bug_tracker_uri,
          dependencies: gem[gem.length - 1].dependencies,
        }));
        document.getElementById("page").classList.remove("is-active");
        this.setState({ gems: newGems });
      },
    });
  }
  render() {
    return (
      <div>
        <div className={`${style.tabs}`}>
          <ul>
            <li className={`${style["is-active"]}`}><a>Upload Gemfile</a></li>
            <li><a>Gem Table</a></li>
          </ul>
        </div>
        <section id="gem">
          <div id="page" className="loader loader-default" />
          <form
            id="file-form" encType="multipart/form-data"
            action="gem" acceptCharset="UTF-8" method="post"
            className={`${style.container}`}
          >
            <input name="utf8" type="hidden" value="✓" />
            <input type="hidden" name="authenticity_token" />
            <input type="file" name="file" id="file" />
            <label className={`${style.label}`} htmlFor="file">
              Upload <i className="fa fa-diamond" aria-hidden="true" /> File
            </label>
            <input
              onClick={this.handleSubmit} type="submit" name="commit"
              value="Submit" id="upload-button" data-disable-with="Submit"
            />
          </form>
        </section>
        <section id="gemlist">
          <table className={`${style.table} ${style["is-bordered"]} ${style["is-striped"]}`}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Version</th>
                <th>Authors</th>
                <th>Total Downloads</th>
                <th>License</th>
              </tr>
            </thead>
            <tbody>
              {this.makeGems()}
            </tbody>
          </table>
        </section>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("app"),
);
