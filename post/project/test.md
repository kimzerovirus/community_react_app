---
title: 'Test post'
date: '2022-07-09'
except: 'This is except'
cover_image: 'images/test.jpg'
---

# Heading
- head
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
