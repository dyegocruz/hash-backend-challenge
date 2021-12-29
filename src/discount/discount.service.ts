import { Injectable, Logger } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const grpc = require('@grpc/grpc-js');
import { loadSync } from '@grpc/proto-loader';
const PROTO_PATH = 'discount.proto';

const packageDefinition = loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const discountProto = grpc.loadPackageDefinition(packageDefinition).discount;

@Injectable()
export class DiscountService {
  logger = new Logger(DiscountService.name);
  async getProductDiscount(productID: number): Promise<number> {
    return new Promise((resolve) => {
      const client = new discountProto.Discount(
        'localhost:50051',
        grpc.credentials.createInsecure(),
      );

      let discount = 0.0;
      client.GetDiscount({ productID }, async function (err, response) {
        if (!err) {
          discount = +response.percentage.toFixed(2);
        }
        resolve(discount);
      });
    });
  }
}
