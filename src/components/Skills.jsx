import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { requestStates } from '../constants';
import { useSkills } from '../customHooks/useSkills';


export const Skills = () => {

  const [sortedLanguageList, fetchRequestState, converseCountToPercentage] = useSkills();

  // const sortedLanguageList = () => (
  //   state.languageList.sort((firstLang, nextLang) => nextLang.count - firstLang.count)
  // )

  // const convertCountToPercentage = (count) => {
  //   if (count > 10) { return 100; }
  //   return count * 10;
  // };

  // const [state, dispatch] = useReducer(skillReducer, initialState);

  // useEffect(() => {
  //   dispatch({ type: actionTypes.fetch });
  //   axios.get('https://api.github.com/users/study28/repos')
  //     .then((response) => {
  //       const languageList = response.data.map(res => res.language);
  //       const countedLanguageList = generateLanguageCountObj(languageList);
  //       dispatch({ type: actionTypes.success, payload: { languageList: countedLanguageList } });
  //     })
  //     .catch(() => {
  //       dispatch({ type: actionTypes.error });
  //     });
  // }, []);

  // const generateLanguageCountObj = (allLanguageList) => {
  //   const notNullLanguageList = allLanguageList.filter(language => language != null);
  //   const uniqueLanguageList = [...new Set(notNullLanguageList)];

  //   return uniqueLanguageList.map(item => {
  //     return {
  //       language: item,
  //       count: allLanguageList.filter(language => language === item).length
  //     }
  //   });
  // };


  return (
    <div id="skills">
      <div className="container">
        <div className="heading">
          <h2>Skills</h2>
        </div>
        <div className="skills-container">
          {
            fetchRequestState === requestStates.loading && (
              <p className="description">取得中...</p>
            )
          }
          {
            fetchRequestState === requestStates.success && (
              sortedLanguageList().map((item, index) => (
                <div className="skill-item" key={index}>
                  <p className="description"><strong>{item.language}</strong></p>
                  <CircularProgressbar value={convertCountToPercentage(item.count)} text={`${convertCountToPercentage(item.count)}%`} />
                </div>
              ))
            )
          }
          {
            fetchRequestState === requestStates.error && (
              <p className="description">エラーが発生しました</p>
            )
          }
        </div>
      </div>
    </div>
  );
};
