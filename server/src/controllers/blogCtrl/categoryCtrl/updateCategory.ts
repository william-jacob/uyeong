import { IReqAuth } from "@_types/types";
import { Response } from "express";
import Categories from "@models/blog/categoryModel";
import Posts from "@models/blog/postModel";

const updateCategory = async (req: IReqAuth, res: Response) => {
  try {
    //user가 middleware auth를 통과 했는지 확인
    if (!req.user) return res.status(400).json({ msg: "Invalid Authorization." });

    //admin인지 확인
    if (req.user.role !== "admin") return res.status(400).json({ msg: "Invalid Authentication." });

    //client 데이터 가져오기
    const { name: oldName, currName } = req.body;

    if (!currName.length) return res.status(400).json({ msg: "The category name must be more than 1 character." });

    if (currName.length > 20)
      return res.status(400).json({ msg: "The category name must be less than 20 characters." });

    //category 조회(중복 조회)
    const duplicateCategory = await Categories.findOne({ name: currName });
    if (duplicateCategory) return res.status(400).json({ msg: "This category name already exists." });

    //category 조회 후 업데이트
    await Categories.findOneAndUpdate({ name: oldName }, { name: currName });

    //post 조회 후 업데이트
    await Posts.updateMany({ category: oldName }, { $set: { category: currName } });

    res.status(200).json({ msg: "Updated successfully!" });
  } catch (err: any) {
    return res.status(500).json({ msg: err.message });
  }
};

export default updateCategory;
