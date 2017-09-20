import realm from '../../databases/factory';
import * as Category from '../../databases/schemas/category';
import { CategoryEntity } from '../../../entities/category';
import { CategoriesEntity } from '../../../entities/categories';

function parseEntity({ path, createAt, updateAt, knowledges }: Category.Types): CategoryEntity {
  return { path, createAt, updateAt, count: knowledges.length };
}

export function get() {
  return realm.objects<Category.Types>(Category.name)
    .map(parseEntity)
    .reduce((tempData, { path, count }) => {
      const pathTree = path.split('/');
      let parentInfo = tempData;

      // initialize
      pathTree.forEach((pathDetail, index) => {
        let currentInfo = parentInfo.children.find(info => info.path === pathDetail);
        if (!currentInfo) {
          currentInfo = {
            path: pathDetail,
            fullPath: `/${pathTree.slice(0, index + 1).join('/')}`,
            count: 0,
            children: [],
          };

          parentInfo.children.push(currentInfo);
        }
        parentInfo = currentInfo;
      });

      // calc count
      const matchRoutes: Array<CategoriesEntity | undefined> = [tempData];
      for (let i = 0, l = pathTree.length; i < l; i += 1) {
        const lastMatchRoute = matchRoutes[matchRoutes.length - 1];
        if (lastMatchRoute) {
          matchRoutes.push(lastMatchRoute.children.find(route => route.path === pathTree[i]));
        }
      }
      matchRoutes.forEach(route => route && (route.count += count));
      return tempData;
    }, {
      path: '/',
      fullPath: '/',
      count: 0,
      children: [],
    } as CategoriesEntity);
}
