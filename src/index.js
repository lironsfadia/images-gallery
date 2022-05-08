import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import "./styles.scss";

ReactDOM.render(<Main />, document.getElementById("root"));

/**
 * Comments:
 * - node_modules are located in the repository, instead of using .gitignore.
 * - https://github.com/lironsfadia/aqua-gallery/blob/master/src/containers/GalleryContainer.js#L11 -
 *   use of interpolation instead of just using the plain string. also using fragments in L15-17 instead of
      using component straightforward.
      3. https://github.com/lironsfadia/aqua-
      gallery/blob/master/src/customHooks/useWindowSize.js - should&#39;ve used a
      prebuilt react-hook which is proven and tested
      (https://www.npmjs.com/package/react-use-window-size)
      4. https://github.com/lironsfadia/aqua-
      gallery/blob/master/src/layout/TitlebarImageList.js#L57 - misuse of a property and
      redundant interpolation.
      5. 
 */
