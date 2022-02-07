export const formatDoc = (data, el) => {
  if (el.category !== "All") {
    let sorted = data.data.filter((item) => {
      if (
        item.name.toLowerCase().includes(el.search) &&
        item.category.includes(el.category)
      ) {
        return item;
      }
    });
    sorted = sortData(sorted, el.order, el.date);
    return sorted;
  } else {
    let sorted = data.data.filter((item) => {
      if (item.name.toLowerCase().includes(el.search)) {
        return item;
      }
    });
    sorted = sortData(sorted, el.order, el.date);
    return sorted;
  }
};

const sortData = (data, name, date) => {
  if (name === "Ascending") {
    data = data.sort((a, b) =>
      a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
    );
  } else if (name === "Descending") {
    data = data.sort((a, b) =>
      a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1
    );
  }
  if (date === "Ascending") {
    data = data.sort((a, b) => new Date(a.created) - new Date(b.created));
  } else if (date === "Descending") {
    data = data.sort((a, b) => new Date(b.created) - new Date(a.created));
  }
  return data;
};
