import React, { useState } from 'react';

export interface IItem {
  type: string
  url?: string
  title?: string
  views: number
}


export interface ILIst {
  list: IItem[] 
}

export interface IChildren {
  children: any
}

export interface IItemPretty extends IItem{
  Component: any

}

function New(props: IChildren) {
    return (
        <div className="wrap-item wrap-item-new">
            <span className="label">New!</span>
            {props.children}
        </div>
    )
};

function Popular(props: IChildren) {
    return (
        <div className="wrap-item wrap-item-popular">
            <span className="label">Popular!</span>
            {props.children}
        </div>
    )
};

function ItemPretty(props: IItemPretty) {
  if (props.views > 1000) {
    return <Popular>
              <props.Component {...props}></props.Component>
            </Popular>
  }
  if (props.views < 100) {
    return <New>
              <props.Component {...props}></props.Component>
          </New>
  }

  return <props.Component {...props}></props.Component>

}

function Article(props: IItem) {
    return (
        <div className="item item-article">
            <h3><a href="#">{props.title}</a></h3>
            <p className="views">Прочтений: {props.views}</p>
        </div>
    )
};

function Video(props: IItem) {
    return (
        <div className="item item-video">
            <iframe src={props.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
            <p className="views">Просмотров: {props.views}</p>
        </div>
    )
};

function List(props: ILIst) {
    return props.list.map(item => {
        switch (item.type) {
            case 'video':
                return (
                    <ItemPretty Component={Video} {...item}></ItemPretty>
                );

            case 'article':
                return (
                    <ItemPretty Component={Article} {...item}></ItemPretty>
                );
        }
    });
};

export default function App() {
    const [list, setList] = useState([
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            views: 50
        },
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            views: 12
        },
        {
            type: 'article',
            title: 'Невероятные события в неизвестном поселке...',
            views: 175
        },
        {
            type: 'article',
            title: 'Секретные данные были раскрыты!',
            views: 1532
        },
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            views: 4253
        },
        {
            type: 'article',
            title: 'Кот Бегемот обладает невероятной...',
            views: 12,
        },
    ]);

    return (
        <List list={list} />
    );
}