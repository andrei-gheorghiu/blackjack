import {
  BlackjackCard,
  CARD_COLORS,
  CARD_NAMES,
  NAME_SYMBOL
} from '../src/types'

const ids = [
  '4dbec547-213e-4b23-85de-0a145b00b22a',
  '2df6bf21-99fe-4dff-9afc-ef6109f1550c',
  'bf6f3bc1-4e3b-4683-9389-66e2f6065b10',
  '53c95bab-c310-459c-b596-46fdc28afcc0',
  '1e527302-9dce-40f5-95e1-fce271ad311c',
  'a293694e-0818-45eb-a705-90d15b2c8707',
  '7479eb5e-bd99-4cb8-93ba-69660430acba',
  '33530864-0c31-422b-84c6-adff649ef9f0',
  '3f35de90-b9cb-4d91-a98f-e95e2adf490c',
  '95d9454e-f94d-478f-88db-49d18ed6a126',
  '510cbc79-f0b8-41df-9a90-0277a136d6f9',
  '156169bf-c40b-466d-9df8-c8707ea24ab0',
  '95fab75d-744c-4c64-9b59-b45641558bd0',
  '88558693-5d02-4242-a649-d0584b122a40',
  '33025c40-956e-47bf-8aa0-e2adf39e0862',
  'b986c93d-d437-4f23-aefc-a73d016b464b',
  '040eb9c5-d3f0-4c30-8bf5-0d7b483b690f',
  '81c6ca85-40f2-4fe3-988d-197c1fa1cb6e',
  '6d1723e3-97ef-4c56-b5ba-6bf517498f8b',
  '8ad7d458-3375-47b6-b6be-6f6fcb5fac64',
  'd924ff81-2f60-4c2d-ae77-e7e04a567847',
  'ffd6bcea-b533-49a3-ad08-9d63133b73db',
  '5207287f-9c22-47fc-9af9-117ffb99d101',
  '622adf8a-0d56-4701-901d-57bf5913fce1',
  'aaf2eabc-5f98-4b00-a130-2679f5aad96b',
  'dc660dea-5db9-42d7-9077-471ae9e4bbd6',
  '4b5ea981-62b3-4aa6-8a0c-869d05c5fd1a',
  '088da76b-f8fe-4457-b7b3-a7b25ce7be2b',
  'b9461e02-af90-446a-94fb-a6682bd41fd9',
  '058353d8-6aac-4806-8e4f-ad58004c1674',
  'd5bc7f53-8d3e-47a7-825c-e7fb98705328',
  '7ea62fd4-7ba9-4f84-a362-c61ed8e26ca5',
  '2b38639c-cc27-4317-ad9a-301ab75458fb',
  '0a799096-3b87-4809-9d36-c3526d9169ef',
  'a79a01a0-0ca1-437d-96f7-62116c6872ef',
  '3f58feb1-1534-4b74-a3b6-c4be48ee8c86',
  '292eaa90-7eb3-4205-a0eb-e7c433350c7f',
  'f3736b2b-32a0-4b13-aa15-dd50c07ca17f',
  '54995dd8-a1be-4f99-bc34-ca9630fd3998',
  'ea434853-cb63-443b-b6e9-070f0ad297eb',
  '5259516c-7faf-47b6-b051-00a64b78cc92',
  '7242fc84-39da-4b37-8295-9db7b9e56ab1',
  '30ad121c-8fcf-4890-98e7-9f862a220358',
  '66a29574-83ea-46af-a4d0-e5251205d195',
  '422da76a-dca0-4cc2-b1c0-300df8398ea5',
  '9e37ab36-1766-4fa3-b030-875d062d251f',
  'd82c2126-f2be-4b54-9120-707257a478fd',
  '4926083e-1c55-4350-a30b-263ddfcf2bbc',
  '64c0bff8-c897-4d08-908e-23cb4006a6cb',
  '7c65bea1-c0fa-40d1-a3e9-c28999779959',
  'f28b9aea-aa01-467b-bf6d-1be551902120',
  'ee2c617c-3075-4f11-a7ed-19b08fc0cfb9'
]

export const testCards = CARD_COLORS.map((color, colorIdx) =>
  CARD_NAMES.map(
    (name, nameIdx) =>
      new BlackjackCard({
        color,
        name,
        id: ids[colorIdx * CARD_NAMES.length + nameIdx]
      })
  )
).flat()

export const testCardIds = Object.assign(
  {},
  ...testCards.map((card) => ({
    [card.color[0] + NAME_SYMBOL[card.name]]: card.id
  }))
)
