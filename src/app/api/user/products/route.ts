// $lookup: {
//     from: "variants",
//     let: { productId: "$_id" },      // ← ये Product collection का _id है
//     pipeline: [
//       { $match: { $expr: { $eq: ["$productId", "$$productId"] } } },
//       { $match: { isDefault: true } },
//       { $limit: 1 }
//     ],
//     as: "defaultVariant"
//   }
