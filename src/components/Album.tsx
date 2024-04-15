import { useState } from "react";
import { useParams } from "react-router-dom";
import { AlbumType } from "../types";
import searchAlbumsAPI from "../services/searchAlbumsAPI";

function Album () {
  const { id } = useParams();
  const [albumsList, setAlbumsList] = useState<AlbumType[]>([]);

  const handleAPI = async () => {
    const result = await searchAlbumsAPI(id);
  }


  return (

  )
}

export default Album;
