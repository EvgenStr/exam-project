SELECT "role",
  SUM(id)
FROM "Users"
GROUP BY "role";
--**********
UPDATE "Users"
SET balance = balance + cashback * 1.1
FROM (
    SELECT u.id,
      SUM(c.prize) AS cashback
    FROM "Users" AS u
      JOIN "Contests" AS c ON c."userId" = u.id
    WHERE "createdAt" BETWEEN '2020-12-25' AND '2021-01-14'
    GROUP BY u.id
  ) AS uc
WHERE "Users".id = uc.id;
--**********
UPDATE "Users"
SET balance = balance + 10
FROM (
    SELECT id
    FROM "Users"
    WHERE role = 'creator' AND rating>0 
    ORDER BY rating DESC
    LIMIT 3
  ) AS uc
WHERE "Users".id = uc.id;