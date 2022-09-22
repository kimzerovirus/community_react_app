---
title: 'Test post'
date: '2022-07-09'
except: 'This is except'
cover_image: 'images/test.jpg'
---

# 자료구조

## 스택
> 스택은 삽입과 삭제 연산이 후입선출로 이루어진 자료구조이다. 따라서 자료구조의 최상단에서만 변화가 이루어진다.
- push : 삽입 연산
- pop : 삭제 연산
- peek : top 위치에 있는 현재 데이터를 확인하는 연산

## 큐
> 큐는 선입선출로 이루어진 자료구조로 스택과 다르게 먼저 들어온 데이터가 먼저 나간다. 따라서 데이터의 변화는 양방향에서 이루어진다.
- rear : 큐에서 가장 끝 데이터를 가리킨다.
- front : 큐의 가장 처음 데이터를 가리킨다.
- add : 큐의 맨 끝 부분(*rear*)에 데이터를 삽입하는 연산
- poll : 큐의 맨 앞(*front*)에 있는 데이터를 삭제하고 확인하는 연산
- peek : 큐의 맨 앞(*front*)에 있는 데이터를 확인하는 연산

## 우선순위 큐
> 우선순위 큐는 값이 들어간 순서와 상관없이 우선순위가 높은 데이터 부터 먼저 나오는 자료구조이다.

# Heading

이건 테스트글입니다. 이중에서도 강조는 *강조* `강조` **강조** ***강조***
Choose the Right SyntaxHighlighter Import for Your Project
The official documentation covers this quite well, but here's the tl;dr:

- Unless you want a massive JS bundle on your markdown pages, you should only be using the Light Build. You will need to manually import the specific languages you are going to be syntax highlighting in your markdown.
- If you're using Next.js, change the theme import from `…/dist/esm/…` to `…/dist/cjs/…`. Hopefully ESM is fully supported in Next.js soon.
- If you want to syntax highlight TSX/JSX you must use Prism. Highlight.js does not support TSX or JSX.

```js
const hello = 'hello';
```

```kotlin
package me.kzv.issue.domain

import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.time.LocalDateTime
import javax.persistence.EntityListeners
import javax.persistence.MappedSuperclass

@EntityListeners(AuditingEntityListener::class)
@MappedSuperclass
abstract class BaseEntity(

    @CreatedDate
    var createdAt: LocalDateTime? = null,

    @LastModifiedDate
    var updatedAt: LocalDateTime? = null,
)
```

> 1. heelo
> 2. heelo
> 3. heelo

> geek <br/>
> geek

> - asdf
> - asdf
> - asdf

### 쿼리 메소드

|Keyword            |Sample            |JPQL Snippet |
|-------------------|------------------|-------------|
|`And`|`findByLastnameAndFirstname`|`… where x.lastname = ?1 and x.firstname = ?2`|
|`Or`|`findByLastnameOrFirstname`|`… where x.lastname = ?1 or x.firstname = ?2`|
|`Is,Equals`|`findByFirstname,findByFirstnameIs,findByFirstnameEquals`|`… where x.firstname = 1?`|
|`Between`|`findByStartDateBetween`|`… where x.startDate between 1? and ?2`|
|`LessThan`|`findByAgeLessThan`|`… where x.age < ?1`|
|`LessThanEqual`|`findByAgeLessThanEqual`|`… where x.age ⇐ ?1`|
|`GreaterThan`|`findByAgeGreaterThan`|`… where x.age > ?1`|
|`GreaterThanEqual`|`findByAgeGreaterThanEqual`|`… where x.age >= ?1`|
|`After`|`findByStartDateAfter`|`… where x.startDate > ?1`|
|`Before`|`findByStartDateBefore`|`… where x.startDate < ?1`|
|`IsNull`|`findByAgeIsNull`|`… where x.age is null`|
|`IsNotNull,NotNull`|`findByAge(Is)NotNull`|`… where x.age not null`|
|`Like`|`findByFirstnameLike`|`… where x.firstname like ?1|
|`NotLike`|`findByFirstnameNotLike`|`… where x.firstname not like ?1`|
|`StartingWith`|`findByFirstnameStartingWith`|`… where x.firstname like ?1(parameter bound with appended %)`|
|`EndingWith`|`findByFirstnameEndingWith`|`… where x.firstname like ?1(parameter bound with prepended %)`|
|`Containing`|`findByFirstnameContaining`|`… where x.firstname like ?1(parameter bound wrapped in %)`|
|`OrderBy`|`findByAgeOrderByLastnameDesc`|`… where x.age = ?1 order by x.lastname desc`|
|`Not`|`findByLastnameNot`|`… where x.lastname <> ?1`|
|`In`|`findByAgeIn(Collection<Age> ages)`|`… where x.age in ?1`|
|`NotIn`|`findByAgeNotIn(Collection<Age> age)`|`… where x.age not in ?1`|
|`True`|`findByActiveTrue()`|`… where x.active = true`|
|`False`|`findByActiveFalse()`|`… where x.active = false`|
|`IgnoreCase`|`findByFirstnameIgnoreCase`|`… where UPPER(x.firstame) = UPPER(?1)`|
