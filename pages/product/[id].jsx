import { Carousel } from "react-responsive-carousel";
import { Footer, Logoheader, ProductCard, Review } from "../../components";
import {
  Accordion,
  Button,
  Divider,
  Drawer,
  Group,
  Radio,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import {
  IconCheck,
  IconChevronRight,
  IconExclamationCircle,
} from "@tabler/icons";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "urql";
import { notifications } from "@mantine/notifications";
import { Userdatacontext } from "../../context/userdata";

import { signIn, useSession } from "next-auth/react";

export default function Product() {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: userData } = useContext(Userdatacontext);

  const GET_PRODUCT = `
      query GET_PRODUCT(
        $id: ID
      ){
        getProduct(
          id: $id
        ){
          name
          description
          category
          images
          variants{
            thumbnail
            price
            label
          }
          additionalInformation{
            label
            value
          }
          reviews{
            name
            rating
            timestamp
            message
          }
          createdAt
        }
      }
  `;

  const ADD_TO_CART = `
      mutation ADD_TO_CART(
        $product : ID
        $variant: String
        $customer: String
      ){
        addToCart(
          customer: $customer
          product: $product
          variant: $variant
        ){
          id
        }
      }
  `;

  const [_, _addToCart] = useMutation(ADD_TO_CART);

  const [{ data, fetching, error }, reexecuteQuery] = useQuery({
    query: GET_PRODUCT,
    variables: {
      id: router?.query?.id,
    },
  });

  const [lineClamp, setLineClamp] = useState(2);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [variant, setVariant] = useState();

  if (fetching) return <p>Fetching ...</p>;
  if (error) return <p>Error...</p>;

  let product = data?.getProduct;
  let sortedVariants = product?.variants.sort((a, b) => a.price - b.price);

  const getPriceLabel = () => {
    if (product) {
      const prices = product?.variants.map((obj) => obj.price);
      const allSame = prices.every((price) => price === prices[0]);

      return prices.length == 1
        ? `Ksh. ${prices[0]}`
        : prices.length > 1 && allSame
        ? `Ksh. ${prices[0]}`
        : `Ksh. ${Math.min(...prices)} - ${Math.max(...prices)}`;
    }
    return "";
  };

  const handleAddToCart = () => {
    if (product?.variants.length > 1 && !variant && !drawerOpen) {
      setDrawerOpen(true);
      return;
    }

    if (!variant && product?.variants?.length > 1 && drawerOpen) {
      notifications.show({
        title: "Select a variant to add to cart",
        color: "orange",
      });
      return;
    }

    if (variant && product?.variants.length > 1) {
      setLoading(true);
      if (session) {
        _addToCart({
          customer: session.user.email,
          product: router?.query?.id,
          variant,
        })
          .then((data, error) => {
            console.log(
              {
                customer: session.user.email,
                product: router?.query?.id,
                variant,
              },
              data,
              error
            );
            if (data?.data?.addToCart && !error) {
              notifications.show({
                title: "Product added to cart",
                icon: <IconCheck />,
                color: "green",
              });
              handleCloseDrawer();
            } else {
              notifications.show({
                title: "Something occured",
                icon: <IconExclamationCircle />,
                color: "red",
              });
              setLoading(false);
            }
          })
          .catch((err) => {
            notifications.show({
              title: "Something occured",
              icon: <IconExclamationCircle />,
              color: "red",
            });
            setLoading(false);
          });
      } else {
        signIn();
      }
    }

    if (product?.variants.length == 1) {
      setLoading(true);
      if (session) {
        _addToCart({
          customer: session.user.email,
          product: router?.query?.id,
          variant: product?.variants[0]?.label,
        })
          .then((data, error) => {
            if (data?.data?.addToCart && !error) {
              notifications.show({
                title: "Product added to cart",
                icon: <IconCheck />,
                color: "green",
              });
              handleCloseDrawer();
            } else {
              notifications.show({
                title: "Something occured",
                icon: <IconExclamationCircle />,
                color: "red",
              });
              setLoading(false);
            }
          })
          .catch((err) => {
            notifications.show({
              title: "Something occured",
              icon: <IconExclamationCircle />,
              color: "red",
            });
            setLoading(false);
          });
      } else {
        signIn();
      }
    }
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setLoading(false);
    setVariant();
  };

  return (
    <div>
      <Logoheader />
      <div className="mt-[80px] relative">
        <Carousel
          showThumbs={true}
          showStatus={false}
          autoPlay
          infiniteLoop
          showIndicators={false}
        >
          {product?.images.map((image, i) => (
            <div key={i}>
              <img src={image} className="w-full" />
            </div>
          ))}
        </Carousel>

        <div className="p-4 space-y-8">
          <div className="space-y-3">
            <Text fz="lg" lineClamp={2} className="text-[#2c2c2c] font-medium">
              {product?.name}
            </Text>

            <div className="flex space-x-2">
              {product?.was && (
                <p className="text-red-600 line-through text-[0.9rem]">
                  Ksh. {product?.was}
                </p>
              )}
              <p className="text-[#A18A68] text-[0.9rem]">{getPriceLabel()}</p>
            </div>
          </div>

          <Button
            color="dark"
            uppercase
            fullWidth
            disabled={
              userData?.cart.some(
                (cartItem) => cartItem?.product.id == router?.query?.id
              ) && product.variants.length == 1
            }
            loading={loading}
            onClick={handleAddToCart}
          >
            <p className="font-medium">add to cart</p>
          </Button>
          {userData?.cart.some(
            (cartItem) => cartItem?.product.id == router?.query?.id
          ) &&
            product.variants.length == 1 && (
              <p className="text-orange-500 w-full text-center">
                (Already in cart)
              </p>
            )}

          <Drawer
            opened={drawerOpen}
            onClose={handleCloseDrawer}
            title={
              <h1 className="py-6 px-3 font-bold text-[1.5rem]">
                Pick a variant
              </h1>
            }
            position="bottom"
            size="70%"
            overlayProps={{ opacity: 0.5, blur: 4 }}
          >
            <Radio.Group
              value={variant}
              onChange={(val) => {
                setVariant(val);
              }}
              name="variant"
              withAsterisk
              mt={30}
            >
              <div className="space-y-12">
                {sortedVariants.map((variant, i) => (
                  <Radio
                    key={i}
                    value={variant?.label}
                    disabled={userData?.cart.some(
                      (cartItem) =>
                        cartItem?.product.id == router?.query?.id &&
                        cartItem?.variant == variant?.label
                    )}
                    label={
                      <div className="flex space-x-4  mt-[-30px]">
                        {variant?.thumbnail ? (
                          <img
                            className="rounded-md object-cover"
                            src={variant?.thumbnail}
                            height={70}
                            width={70}
                          />
                        ) : (
                          <div className=" border-gray-400 border-2 p-7 justify-center align-middle min-h-[70px] min-w-[70px]">
                            <p>{variant?.label}</p>
                          </div>
                        )}
                        <div className="h-full relative">
                          <p className="text-[#A18A68] font-medium mt-5">
                            Ksh.{variant?.price}{" "}
                          </p>
                          {userData?.cart.some(
                            (cartItem) =>
                              cartItem?.product.id == router?.query?.id &&
                              cartItem?.variant == variant?.label
                          ) && (
                            <p className="text-red-500 mt-2">
                              (Already in cart)
                            </p>
                          )}
                        </div>
                      </div>
                    }
                  />
                ))}
              </div>
            </Radio.Group>
            <Space h={30} />
            <Button
              fw="lighter"
              uppercase
              color="dark"
              fullWidth
              onClick={handleAddToCart}
              loading={loading}
            >
              Add to cart
            </Button>
          </Drawer>

          <div>
            <Text lineClamp={lineClamp} color="#909090">
              {product?.description}
            </Text>

            <span
              className="text-[#A18A68] hover:cursor-pointer flex mt-2 mb-4"
              onClick={() =>
                lineClamp == 2 ? setLineClamp(10) : setLineClamp(2)
              }
            >
              View {lineClamp == 2 ? "more" : "less"}{" "}
              <IconChevronRight size={16} style={{ marginTop: 6 }} />
            </span>
            <Divider />
          </div>

          <div>
            <Accordion defaultValue="more">
              <Accordion.Item value="more">
                <Accordion.Control>
                  <p className="font-medium">Additional Information</p>
                </Accordion.Control>
                <Accordion.Panel>
                  <div className="space-y-2 p-2">
                    {product?.additionalInformation.map((info, i) => (
                      <p key={i} className="font-medium">
                        {info?.label}:{" "}
                        <span className="font-light">{info?.value}</span>
                      </p>
                    ))}
                  </div>
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="reviews">
                <Accordion.Control>
                  <p className="font-medium">
                    Reviews ({product?.reviews.length})
                  </p>
                </Accordion.Control>
                <Accordion.Panel>
                  <div className="space-y-8">
                    {product?.reviews.length < 1 ? (
                      <div className="bg-gray-100 p-4 border-t-2 border-[#A18A68]">
                        <Text>No reviews yet.</Text>
                      </div>
                    ) : (
                      product?.reviews.map((review, i) => (
                        <Review key={i} review={review} />
                      ))
                    )}
                  </div>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </div>

          <div className="mt-12 space-y-8">
            <p className="font-medium text-[1.3rem]">Similar Items</p>
            <div className="w-full flex overflow-x-auto space-x-8">
              {[
                {
                  id: 1,
                  name: "Lira Earrings",
                  price: 2000,
                },
                {
                  id: 2,
                  name: "Ollie Earrings",
                  price: 2000,
                },
                {
                  id: 3,
                  name: "Hal Earrings",
                  price: 2000,
                },
                {
                  id: 4,
                  name: "Kaede Earrings",
                  price: 2000,
                  was: 2500,
                },
              ].map((el, i) => (
                <ProductCard product={el} key={i} />
              ))}
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}
