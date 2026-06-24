import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes)                                // Получаем ключи из объекта
      .forEach((elementName) => {                       // Перебираем по именам
        elements[elementName].append(                   // в каждый элемент добавляем опции
            ...Object.values(indexes[elementName])      // формируем массив имён, значений опций
                      .map(name => {                    // используйте name как значение и текстовое содержимое
                        const el = document.createElement("option");       // @todo: создать и вернуть тег опции
                        el.textContent = name;
                        el.value = name;
                        return el;
                      })
        )
     });

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if(action && action.name === 'clear') {
            // const input = action.parentNode.querySelector('input');
            const input = action.target.closest('.filter-group');
            if(input) {
                input.value = '';
            }
            if(state.filters && action.dataset.field) {
                state.filters[action.dataset.field] = '';
            }
        }

        const totalFrom = +state.totalFrom || undefined;
        const totalTo = +state.totalTo || undefined;
        
        delete state.totalFrom;
        delete state.totalTo;

        state.total = [totalFrom, totalTo];

        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    }
}