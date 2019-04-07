TZ #1, v.2.0
===

## О себе

Меня зовут Евгений и я разработчик =)
Два года работаю со стеком React/Redux/React-router.
На текущем месте работы мы не используем Typescript, по этому меня заинтересовало принять участие в данном проекте.
Кроме того ранее так же не использовал react-hooks, так как в текущие проекты нет смысла переписывать, а в для новых проектов нет уверенности в необходимости этих нововведений.


## Про приложение

- [x] выполнен базовый функционал
- [x] использованы react-hooks
- [x] использован typescript
- [ ] оформление
- [ ] docker
- [x] demo (http://epodivilov.github.io/TZ-1/)

## Вопросы

Буду рад конструктивной критике по поводу использования typescript и react-hooks.
Основные вопросы по typescript:
- Как правильно организовывать хранение типов?
- Если мы храним типы рядом с реализацией, нормально ли в дальнейшем иметь перекрёстные импорты типов, при том что сами реализации не импортируются.
- Использование вместе с Redux всегда боль? Или я не правильно готовлю?

Основные вопросы по react-hooks:
- Зачем? Когда это:
```javascript
  const Component = ({ onClick }) => {
  const [value, setValue] = useState('');

  const handleChange = useCallback(e => setValue(e.target.value), [value])
  const handleSubmit = useCallback(e => onClick({ value }), [value]);

  return (
    <div>
      Message
      <input type="text" value={value} onChange={handleChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};
```
стало лучше чем это:
```javascript
class Component extends React.Component {
  state = { value: '' }

  handleChange = e => this.setState({
    value: e.target.value
  })

  handleSubmit = () => {
    const { value } = this.state
    const { onClick } = this.props;

    onClick({ value })
  }

  render() {
    const { value } = this.state

    return (
      <div>
        Message
        <input type="text" value={value} onChange={this.handleChange} />
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}
```
На мой взгляд, классы позволяют структурировать view и обработчики, не пихая всё в рендер функцию. 
- Есть ли реальные плюсы от использования react-hooks? Вынос повторяющейся логики можно сделать и с классами. Интересуют реальные примеры использования в крупных приложениях.