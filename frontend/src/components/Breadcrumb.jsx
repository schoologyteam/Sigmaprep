import { useSelector } from 'react-redux';
import { Breadcrumb } from 'semantic-ui-react';
import { changeNavbarPage, selectNavbarState } from './navbar/navbarSlice';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';

export default function HistoryNav() {
  const dispatch = useDispatch();
  const urlArr = useSelector(selectNavbarState).navbar.page?.split('/');
  /**
   *
   * @param {Array} urlArr
   * @returns
   */
  function mapCurrentNavbarStateToSectionsOfBreadcrumb(urlArr) {
    if (!urlArr) return null;
    let sections = [];
    for (let i = 0; i < urlArr.length; i++) {
      if (urlArr[i] == '' || urlArr[i] == ' ') {
      } else {
        let curItemUrl = urlArr.slice(0, i + 1).join('/');
        sections.push({
          key: urlArr[i],
          content: urlArr[i][0].toUpperCase() + urlArr[i].slice(1),
          onClick: () => dispatch(changeNavbarPage(curItemUrl)),
          active: urlArr[urlArr.length - 1] == urlArr[i] ? true : false,
        });
      }
    }
    return sections;
  }

  const sections = useMemo(() => {
    return mapCurrentNavbarStateToSectionsOfBreadcrumb(urlArr);
  }, [urlArr]);

  return <>{sections ? <Breadcrumb icon='right angle' sections={sections} /> : null}</>;
}
