export const getData = async () => {
    let response = await fetch(
      "https://front-end-task-dot-result-analytics-dot-fpls-dev.uc.r.appspot.com/api/v1/public/task_templates"
    );
    let res = await response.json();
    return res;
};

