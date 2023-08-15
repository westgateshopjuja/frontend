import { Text, UnstyledButton } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconBookmark, IconStar } from "@tabler/icons";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useMutation } from "urql";
import { Userdatacontext } from "../context/userdata";
import { Carousel } from "react-responsive-carousel";

export default function ProductCard({ hit }) {
  const getPriceLabel = () => {
    if (hit) {
      const prices = hit?.variants.map((obj) => obj.price);
      const allSame = prices.every((price) => price === prices[0]);

      return prices.length == 1
        ? `Ksh. ${prices[0]}`
        : prices.length > 1 && allSame
        ? `Ksh. ${prices[0]}`
        : `Ksh. ${Math.min(...prices)} - ${Math.max(...prices)}`;
    }
    return "";
  };

  const router = useRouter();

  const { data: session } = useSession();
  const { data } = useContext(Userdatacontext);

  const SAVE_UNSAVE = `
    mutation SAVE_UNSAVE(
      $customer: String
      $product: ID
    ){
      saveUnsave(customer: $customer , product: $product){
        id
      }
    }
  `;

  const [_, _saveUnsave] = useMutation(SAVE_UNSAVE);

  const handleSave = () => {
    if (!session) {
      signIn();
      return;
    }
    _saveUnsave({
      product: hit?.id,
      customer: session.user.email,
    })
      .then(({ data, error }) => {
        return;
      })
      .catch((err) => {
        notifications.show({
          color: "red",
          title: "An error occured",
        });
      });
  };

  return (
    <div className="col-span-1 space-y-2 relative hover:cursor-pointer min-w-[30vw]">
      {data?.saved.filter((item) => item.id == hit?.id).length > 0 ? (
        <UnstyledButton
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            zIndex: 10,
            background: "#f1f1f1",
            width: 40,
            height: 40,
            borderRadius: "50%",
          }}
          onClick={handleSave}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="#228B22"
            className="ml-[10px]"
          >
            <path d="M19 24l-7-6-7 6v-24h14v24z" />
          </svg>
        </UnstyledButton>
      ) : (
        <UnstyledButton
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            zIndex: 10,
            background: "#f1f1f1",
            width: 40,
            height: 40,
            borderRadius: "50%",
          }}
          onClick={handleSave}
        >
          <svg
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            viewBox="0 0 24 24"
            className="ml-[10px]"
          >
            <path d="M5 0v24l7-6 7 6v-24h-14zm1 1h12v20.827l-6-5.144-6 5.144v-20.827z" />
          </svg>
        </UnstyledButton>
      )}

      <Carousel
        infiniteLoop
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
        autoPlay
      >
        {hit?.images.map((image, i) => (
          <div key={i}>
            <img className="w-full h-[200px] object-contain" src={image} />
          </div>
        ))}
      </Carousel>

      <div onClick={() => router.push(`/product/${hit?.id}`)}>
        <Text lineClamp={2} className="text-[#2c2c2c] font-medium">
          {hit?.name}
        </Text>
        <div className="flex space-x-2">
          {hit?.was && (
            <p className="text-red-600 line-through text-[0.9rem]">
              Ksh. {hit?.was}
            </p>
          )}
          <p className="text-[#228B22] text-[0.9rem]">{getPriceLabel()}</p>
        </div>
      </div>
    </div>
  );
}
